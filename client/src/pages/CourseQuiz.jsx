import React, { useState } from "react";
import Footer from "../components/student/Footer";

const CourseQuiz = () => {
 const questions = [
  {
    question: "React কোন কোম্পানি বানিয়েছে?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "useState কোন জিনিস?",
    options: ["React Hook", "Component", "Library", "Variable"],
    answer: "React Hook",
  },
  {
    question: "JavaScript কোন টাইপের ল্যাঙ্গুয়েজ?",
    options: ["Compiled", "Interpreted", "Assembly", "Machine"],
    answer: "Interpreted",
  },
  {
    question: "JavaScript এ কোন keyword দিয়ে variable declare করা হয়?",
    options: ["var", "let", "const", "সবগুলোই"],
    answer: "সবগুলোই",
  },
  {
    question: "NaN এর full meaning কী?",
    options: ["Not a Number", "New and Null", "Negative and Null", "None"],
    answer: "Not a Number",
  },
  {
    question: "=== (triple equals) কি করে?",
    options: [
      "শুধু value compare করে",
      "value এবং type দুটোই compare করে",
      "শুধু type check করে",
      "কিছুই না",
    ],
    answer: "value এবং type দুটোই compare করে",
  },
  {
    question: "JavaScript এ কোন ডেটা টাইপ primitive নয়?",
    options: ["Number", "String", "Object", "Boolean"],
    answer: "Object",
  },
  {
    question: "setTimeout() কি করে?",
    options: [
      "একটা ফাংশনকে delay দিয়ে execute করে",
      "একবারে stop করে",
      "Interval চালায়",
      "DOM পরিবর্তন করে",
    ],
    answer: "একটা ফাংশনকে delay দিয়ে execute করে",
  },
  {
    question: "JavaScript এ array এর length property কি দেয়?",
    options: [
      "array এর শেষ element",
      "array এর প্রথম element",
      "array এর size/length",
      "array এর index",
    ],
    answer: "array এর size/length",
  },
  {
    question: "JavaScript এ কোন ফাংশন দিয়ে JSON string কে object এ convert করা হয়?",
    options: ["JSON.parse()", "JSON.stringify()", "toObject()", "convertJSON()"],
    answer: "JSON.parse()",
  },
];


  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setCurrentQ(currentQ + 1);
  };

  return (
    <>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Course Quiz</h1>
      {currentQ < questions.length ? (
        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            {questions[currentQ].question}
          </h2>
          {questions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              className="block w-full p-2 my-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <h2 className="text-xl font-bold">
          🎉 Quiz Completed! Score: {score}/{questions.length}
        </h2>
      )}
    </div>
    <div>
        <Footer/>
    </div>
    
    </>
  );
};

export default CourseQuiz;
