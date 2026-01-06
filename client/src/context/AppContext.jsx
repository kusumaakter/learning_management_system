import { createContext, useEffect, useState, useCallback } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { loginApi, signupApi, logoutApi, checkAuthApi } from "../api/authApi";
import { ROLE_REDIRECTS, ROUTES } from "../constants/routes";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  // Course state
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Auth state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Only for initial auth check
  const [authError, setAuthError] = useState(null);

  // Derived state
  const isEducator = user?.role === "educator" || user?.role === "admin";

  // Clear auth error
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Check authentication on app load
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await checkAuthApi();
      if (response.success && response.isAuthenticated) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setAuthError(null);
      const response = await loginApi({ email, password });

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      return { success: false, error: response.message || "Login failed" };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setAuthError(message);
      return { success: false, error: message };
    }
  }, []);

  // Signup function
  const signup = useCallback(async (name, email, password, role = "student") => {
    try {
      setAuthError(null);
      const response = await signupApi({ name, email, password, role });

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      return { success: false, error: response.message || "Signup failed" };
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      const errors = error.response?.data?.errors || {};
      setAuthError(message);
      return { success: false, error: message, errors };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await logoutApi();
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear state even if API fails
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  // Course utility functions
  const fetchAllCourses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/courses`);
      const data = await response.json();
      if (data.success && data.courses) {
        setAllCourses(data.courses);
      } else {
        // Fallback to dummy courses if API fails
        setAllCourses(dummyCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to dummy courses on error
      setAllCourses(dummyCourses);
    }
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  const fetchUserEnrolledCourses = async () => {
    if (!isAuthenticated) {
      setEnrolledCourses([]);
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/courses/enrolled`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success && data.enrolledCourses) {
        setEnrolledCourses(data.enrolledCourses);
      } else {
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setEnrolledCourses([]);
    }
  };

  const refreshEnrolledCourses = () => {
    fetchUserEnrolledCourses();
  };

  // Initialize app
  useEffect(() => {
    checkAuth();
    fetchAllCourses();
  }, [checkAuth]);

  // Fetch enrolled courses when auth state changes
  useEffect(() => {
    fetchUserEnrolledCourses();
  }, [isAuthenticated]);

  const value = {
    // App config
    currency,
    navigate,

    // Auth state
    user,
    isAuthenticated,
    isLoading,
    authError,
    isEducator,

    // Auth actions
    login,
    signup,
    logout,
    checkAuth,
    clearError,

    // Course state
    allCourses,
    enrolledCourses,

    // Course utilities
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    fetchUserEnrolledCourses,
    refreshEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
