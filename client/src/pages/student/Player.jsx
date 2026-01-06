import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube"
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import { getEnrolledCoursesApi, updateLectureProgressApi } from '../../api/courseApi';

const Player = () => {
  const { calculateChapterTime, navigate, refreshEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  // Fetch course data directly from API
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await getEnrolledCoursesApi();
      if (response.success && response.enrolledCourses) {
        const course = response.enrolledCourses.find(c => c._id === courseId);
        if (course) {
          setCourseData(course);
          setCompletedLectures(course.progress?.completedLectures || []);
        } else {
          console.error('Course not found in enrollments');
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Mark lecture as complete
  const handleMarkComplete = async (lectureId) => {
    if (completedLectures.includes(lectureId)) return; // Already completed

    try {
      setMarkingComplete(true);
      const response = await updateLectureProgressApi(courseId, lectureId);
      if (response.success) {
        setCompletedLectures(response.progress.completedLectures);
        // Refresh context data
        refreshEnrolledCourses();
      }
    } catch (error) {
      console.error('Error marking lecture complete:', error);
    } finally {
      setMarkingComplete(false);
    }
  };

  // Check if lecture is completed
  const isLectureCompleted = (lectureId) => {
    return completedLectures.includes(lectureId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Course not found</h2>
        <button
          onClick={() => navigate('/my-enrollments')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to My Enrollments
        </button>
      </div>
    );
  }

  // Calculate progress
  let totalLectures = 0;
  courseData.courseContent?.forEach(chapter => {
    totalLectures += chapter.chapterContent?.length || 0;
  });
  const progressPercent = totalLectures > 0
    ? Math.round((completedLectures.length / totalLectures) * 100)
    : 0;

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* left column */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>{courseData.courseTitle}</h2>

          {/* Progress bar */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Course Progress</span>
              <span className="text-sm font-medium text-blue-600">{progressPercent}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedLectures.length} of {totalLectures} lectures completed
            </p>
          </div>

          <h3 className='text-lg font-medium mt-6 mb-2'>Course Structure</h3>

          <div className="pt-2">
            {courseData && courseData.courseContent?.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white mb-2 rounded-2xl"
              >
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => toggleSection(index)}
                  >
                    <img
                      className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""
                        }`}
                      src={assets.down_arrow_icon}
                      alt="arrow_icon"
                    />
                    <p className="font-medium md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-base">
                    {chapter.chapterContent?.length || 0} lectures -{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-[500px]" : "max-h-0"
                    }`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent?.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img
                          src={isLectureCompleted(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon}
                          alt={isLectureCompleted(lecture.lectureId) ? "completed" : "play icon"}
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                          <p className={isLectureCompleted(lecture.lectureId) ? "text-green-600" : ""}>
                            {lecture.lectureTitle}
                          </p>
                          <div className="flex gap-2 items-center">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() => setPlayerData({
                                  ...lecture, chapter: index + 1, lecture: i + 1
                                })}
                                className="text-blue-500 cursor-pointer hover:underline"
                              >
                                Watch
                              </p>
                            )}
                            <p className="text-gray-500">
                              {humanizeDuration(
                                (lecture.lectureDuration || 0) * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quiz Section */}
          <div className="mt-8 p-4 border border-gray-300 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50">
            <h3 className="text-lg font-semibold mb-2">📝 Course Quiz</h3>
            <p className="text-gray-600 text-sm mb-4">
              Test your knowledge with the course quiz to complete your learning!
            </p>
            <button
              onClick={() => navigate(`/quiz/${courseId}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Take Quiz
            </button>
          </div>

          <div className='flex items-center gap-2 py-3 mt-6'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* right column - Video Player */}
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl?.split('/').pop()}
                iframeClassName="w-full aspect-video rounded-lg"
                opts={{
                  width: '100%',
                  playerVars: {
                    autoplay: 0,
                  },
                }}
              />
              <div className='flex justify-between items-center mt-3 p-3 bg-gray-50 rounded-lg'>
                <div>
                  <p className="font-medium">
                    {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {humanizeDuration((playerData.lectureDuration || 0) * 60 * 1000, { units: ["h", "m"] })}
                  </p>
                </div>
                <button
                  onClick={() => handleMarkComplete(playerData.lectureId)}
                  disabled={markingComplete || isLectureCompleted(playerData.lectureId)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${isLectureCompleted(playerData.lectureId)
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    } ${markingComplete ? 'opacity-50' : ''}`}
                >
                  {markingComplete
                    ? 'Saving...'
                    : isLectureCompleted(playerData.lectureId)
                      ? '✓ Completed'
                      : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={courseData?.courseThumbnail || ""}
                alt={courseData?.courseTitle}
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <p className="text-white text-lg font-medium">Select a lecture to start watching</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player