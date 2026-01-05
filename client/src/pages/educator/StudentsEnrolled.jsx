import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled, assets } from "../../assets/assets";
import Loading from '../../components/student/Loading';
import { getEnrolledStudentsApi } from '../../api/courseApi';

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const response = await getEnrolledStudentsApi();
      if (response.success) {
        setEnrolledStudents(response.enrolledStudents);
      } else {
        setEnrolledStudents(dummyStudentEnrolled);
      }
    } catch (error) {
      console.log("API not available, using dummy data");
      setEnrolledStudents(dummyStudentEnrolled);
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <table className='table-fixed md:table-auto w-full overflow-hidden pb-4'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
              <th className='px-4 py-3 font-semibold'>Student Name</th>
              <th className='px-4 py-3 font-semibold'>Course Title</th>
              <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
              <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.length > 0 ? (
              enrolledStudents.map((item, index) => (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl || assets.profile_img}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="truncate block">{item.student.name}</span>
                      {item.student.email && (
                        <span className="text-xs text-gray-400 truncate block">{item.student.email}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-sm">
                    {formatDate(item.purchaseDate)}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                      {item.status === 'completed' ? 'Completed' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled;