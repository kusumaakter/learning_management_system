import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { getEnrolledCoursesApi, unenrollFromCourseApi, completeCourseApi } from '../../api/courseApi';
import Loading from '../../components/student/Loading';

const MyEnrollments = () => {
  const { calculateCourseDuration, navigate, calculateNoOfLectures } = useContext(AppContext);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await getEnrolledCoursesApi();
      if (response.success) {
        setEnrolledCourses(response.enrolledCourses);
      }
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const handleFinish = async (courseId) => {
    setActionLoading(prev => ({ ...prev, [courseId]: 'finish' }));
    try {
      const response = await completeCourseApi(courseId);
      if (response.success) {
        // Update local state
        setEnrolledCourses(prev =>
          prev.map(course =>
            course._id === courseId
              ? { ...course, status: 'completed', progress: { ...course.progress, percentComplete: 100 } }
              : course
          )
        );
      }
    } catch (error) {
      console.error("Failed to complete course:", error);
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: null }));
    }
  };

  const handleDelete = async (courseId) => {
    setActionLoading(prev => ({ ...prev, [courseId]: 'delete' }));
    try {
      const response = await unenrollFromCourseApi(courseId);
      if (response.success) {
        // Remove from local state
        setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Failed to unenroll:", error);
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: null }));
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className='md:px-36 px-8 pt-10 min-h-screen'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>

        {enrolledCourses?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('/course-list')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
            <thead className='text-gray-800 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>Course</th>
                <th className='px-4 py-3 font-semibold truncate'>Duration</th>
                <th className='px-4 py-3 font-semibold truncate'>Status</th>
                <th className='px-4 py-3 font-semibold truncate'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {enrolledCourses?.map((course, index) => (
                <tr key={course._id || index} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                    <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28 rounded' />
                    <div className='flex-1'>
                      <p className='mb-1 max-sm:text-sm font-medium'>{course.courseTitle}</p>
                      <Line
                        strokeWidth={2}
                        percent={course.progress?.percentComplete || 0}
                        strokeColor={course.status === 'completed' ? '#22c55e' : '#3b82f6'}
                        className='bg-gray-300 rounded-full'
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {course.progress?.percentComplete || 0}% complete
                      </p>
                    </div>
                  </td>
                  <td className='px-4 py-3 max-sm:hidden'>
                    {calculateCourseDuration(course)}
                  </td>
                  <td className='px-4 py-3'>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${course.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className="flex flex-wrap gap-2">
                      {/* Go To Course */}
                      <button
                        className='px-3 py-1.5 bg-blue-600 text-white rounded text-sm cursor-pointer hover:bg-blue-700 transition'
                        onClick={() => navigate('/player/' + course._id)}
                      >
                        {course.status === 'completed' ? 'Review' : 'Continue'}
                      </button>

                      {/* Finish Button */}
                      {course.status !== 'completed' && (
                        <button
                          className='px-3 py-1.5 bg-green-600 text-white rounded text-sm cursor-pointer hover:bg-green-700 transition disabled:bg-gray-400'
                          onClick={() => handleFinish(course._id)}
                          disabled={actionLoading[course._id] === 'finish'}
                        >
                          {actionLoading[course._id] === 'finish' ? 'Finishing...' : 'Finish'}
                        </button>
                      )}

                      {/* Delete Button */}
                      {deleteConfirm === course._id ? (
                        <div className="flex gap-1">
                          <button
                            className='px-2 py-1 bg-red-600 text-white rounded text-xs cursor-pointer hover:bg-red-700'
                            onClick={() => handleDelete(course._id)}
                            disabled={actionLoading[course._id] === 'delete'}
                          >
                            {actionLoading[course._id] === 'delete' ? '...' : 'Confirm'}
                          </button>
                          <button
                            className='px-2 py-1 bg-gray-400 text-white rounded text-xs cursor-pointer hover:bg-gray-500'
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className='px-3 py-1.5 bg-red-500 text-white rounded text-sm cursor-pointer hover:bg-red-600 transition'
                          onClick={() => setDeleteConfirm(course._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
