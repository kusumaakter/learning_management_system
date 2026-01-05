import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { getEducatorDashboardApi } from "../../api/courseApi";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await getEducatorDashboardApi();
      if (response.success) {
        setDashboardData(response);
      } else {
        // Fallback to dummy data
        setDashboardData(dummyDashboardData);
      }
    } catch (error) {
      console.log("API not available, using dummy data");
      setDashboardData(dummyDashboardData);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-center justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-2xl">
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalEnrollments || dashboardData.enrolledStudentsData?.length || 0}
              </p>
              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-2xl">
            <img src={assets.appointments_icon} alt="appointments_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-2xl">
            <img src={assets.earning_icon} alt="earning_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency}{dashboardData.totalEarnings}
              </p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData?.length > 0 ? (
                  dashboardData.enrolledStudentsData.map((item, index) => (
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
                        <span className="truncate">{item.student.name}</span>
                      </td>
                      <td className="px-4 py-3 truncate">{item.courseTitle}</td>
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
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-400">
                      No enrollments yet. Share your courses to get students!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
