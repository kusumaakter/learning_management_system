import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
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

const App = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Routes>

      <Route element={<AppLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:keyword" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/course/:id/docs" element={<CourseDocs />} />
        <Route path="/course/:id/quiz" element={<CourseQuiz />} />
      </Route>
      <Route path="/educator" element={<Educator />}>
        <Route index element={<Dashboard />} />
        <Route path="add-courses" element={<AddCourses />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="students-enrolled" element={<StudentsEnrolled />} />
      </Route>

      <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 Not Found</h1>} />

    </Routes>
  );
};

export default App;
