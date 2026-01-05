import api from "./axiosConfig";

/**
 * Get all published courses
 */
export const getAllCoursesApi = async () => {
    const response = await api.get("/api/courses");
    return response.data;
};

/**
 * Get single course by ID
 * @param {string} id - Course ID
 */
export const getCourseByIdApi = async (id) => {
    const response = await api.get(`/api/courses/${id}`);
    return response.data;
};

/**
 * Enroll in a course
 * @param {string} courseId - Course ID
 */
export const enrollInCourseApi = async (courseId) => {
    const response = await api.post(`/api/courses/${courseId}/enroll`);
    return response.data;
};

/**
 * Unenroll from a course
 * @param {string} courseId - Course ID
 */
export const unenrollFromCourseApi = async (courseId) => {
    const response = await api.delete(`/api/courses/${courseId}/unenroll`);
    return response.data;
};

/**
 * Mark course as completed
 * @param {string} courseId - Course ID
 */
export const completeCourseApi = async (courseId) => {
    const response = await api.put(`/api/courses/${courseId}/complete`);
    return response.data;
};

/**
 * Get user's enrolled courses
 */
export const getEnrolledCoursesApi = async () => {
    const response = await api.get("/api/courses/enrolled");
    return response.data;
};

/**
 * Get educator dashboard data
 */
export const getEducatorDashboardApi = async () => {
    const response = await api.get("/api/educator/dashboard");
    return response.data;
};

/**
 * Get students enrolled in educator's courses
 */
export const getEnrolledStudentsApi = async () => {
    const response = await api.get("/api/educator/students");
    return response.data;
};
