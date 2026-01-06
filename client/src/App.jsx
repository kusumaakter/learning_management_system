import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./pages/student/Loading";
import CourseDocs from "./pages/CourseDocs";
import CourseQuiz from "./pages/CourseQuiz";

import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourses from "./pages/educator/AddCourses";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

import Login from "./components/Login";
import Signup from "./components/Signup";

import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleBasedRoute from "./components/common/RoleBasedRoute";
import { ROLES } from "./constants/routes";

const App = () => {
  return (
    <Routes>
      {/* Public routes with AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:keyword" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Protected student routes */}
        <Route
          path="/my-enrollments"
          element={
            <ProtectedRoute>
              <MyEnrollments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:courseId"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id/docs"
          element={
            <ProtectedRoute>
              <CourseDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id/quiz"
          element={
            <ProtectedRoute>
              <CourseQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:courseId"
          element={
            <ProtectedRoute>
              <CourseQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/loading/:path" element={<Loading />} />
      </Route>

      {/* Educator routes - protected with role check */}
      <Route
        path="/educator"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.EDUCATOR, ROLES.ADMIN]}>
            <Educator />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-courses" element={<AddCourses />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="students-enrolled" element={<StudentsEnrolled />} />
      </Route>

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <p className="text-xl text-gray-500 mb-6">Page Not Found</p>
            <a
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
