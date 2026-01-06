import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/student/Footer";
import { completeCourseApi, getEnrolledCoursesApi } from "../api/courseApi";
import { AppContext } from "../context/AppContext";

const CourseQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { refreshEnrolledCourses } = useContext(AppContext);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Sample quiz questions - in production these would come from the course data
  const questions = [
    {
      question: "What is the primary purpose of React hooks?",
      options: [
        "To add styling to components",
        "To use state and lifecycle features in functional components",
        "To create new HTML elements",
        "To connect to databases"
      ],
      answer: "To use state and lifecycle features in functional components",
    },
    {
      question: "Which hook is used to manage state in a functional component?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      answer: "useState",
    },
    {
      question: "What does the useEffect hook do?",
      options: [
        "Manages component state",
        "Handles side effects in components",
        "Creates context for components",
        "Refs DOM elements"
      ],
      answer: "Handles side effects in components",
    },
    {
      question: "What is JSX?",
      options: [
        "A database query language",
        "A syntax extension that looks similar to HTML",
        "A CSS framework",
        "A testing library"
      ],
      answer: "A syntax extension that looks similar to HTML",
    },
    {
      question: "How do you pass data from parent to child component?",
      options: ["Using state", "Using props", "Using context only", "Using events"],
      answer: "Using props",
    },
  ];

  // Fetch course title
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getEnrolledCoursesApi();
        if (response.success) {
          const course = response.enrolledCourses.find(c => c._id === courseId);
          if (course) {
            setCourseTitle(course.courseTitle);
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = async () => {
    if (!courseId) {
      navigate('/my-enrollments');
      return;
    }

    try {
      setSubmitting(true);
      // Only mark as complete if passed (>= 60%)
      const passPercentage = (score / questions.length) * 100;
      if (passPercentage >= 60) {
        await completeCourseApi(courseId);
        refreshEnrolledCourses();
      }
    } catch (error) {
      console.error('Error completing course:', error);
    } finally {
      setSubmitting(false);
      navigate(courseId ? `/player/${courseId}` : '/my-enrollments');
    }
  };

  const passPercentage = (score / questions.length) * 100;
  const passed = passPercentage >= 60;

  return (
    <>
      <div className="min-h-screen p-6 md:px-36 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate(courseId ? `/player/${courseId}` : '/my-enrollments')}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-1"
            >
              ← Back to Course
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {courseTitle ? `Quiz: ${courseTitle}` : 'Course Quiz'}
            </h1>
          </div>

          {!showResult ? (
            <>
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    Score: {score}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-6 text-gray-800">
                  {questions[currentQ].question}
                </h2>
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      className="block w-full p-4 text-left bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      onClick={() => handleAnswer(opt)}
                    >
                      <span className="font-medium text-gray-600 mr-3">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results card */
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
              <div className={`text-6xl mb-4 ${passed ? '' : '😅'}`}>
                {passed ? '🎉' : '📚'}
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Quiz {passed ? 'Passed!' : 'Complete'}
              </h2>
              <div className="mb-6">
                <p className="text-5xl font-bold text-blue-600 mb-2">
                  {score}/{questions.length}
                </p>
                <p className={`text-lg ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                  {passPercentage.toFixed(0)}% - {passed ? 'Great job!' : 'Keep learning!'}
                </p>
              </div>

              {passed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-700">
                    ✓ Congratulations! You've successfully completed this course quiz.
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-orange-700">
                    You need at least 60% to pass. Review the course content and try again!
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setCurrentQ(0);
                    setScore(0);
                    setShowResult(false);
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={handleComplete}
                  disabled={submitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : passed ? 'Complete Course' : 'Back to Course'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseQuiz;
