import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { assets } from "../../assets/assets";
import { ROUTES, ROLES } from "../../constants/routes";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, isEducator, isAdmin, logout, navigate } = useAuth();
  const location = useLocation();
  const isColorListPage = location.pathname.includes("/course-list");

  const handleLogout = async () => {
    await logout();
  };

  // Get role badge color
  const getRoleBadgeClass = () => {
    if (isAdmin) return "bg-red-100 text-red-700";
    if (isEducator) return "bg-purple-100 text-purple-700";
    return "bg-blue-100 text-blue-700";
  };

  // Get role label
  const getRoleLabel = () => {
    if (isAdmin) return "Admin";
    if (isEducator) return "Educator";
    return "Student";
  };

  if (isLoading) {
    return <div className="h-16 bg-cyan-100/70"></div>;
  }

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isColorListPage ? "bg-white" : "bg-cyan-100/70"
        }`}
    >
      <img
        onClick={() => navigate(ROUTES.HOME)}
        src={assets.logo}
        alt="Logo"
        className="w-30 lg:w-32 cursor-pointer h-30 rounded-t-full"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {isAuthenticated && (
            <>
              {/* Show Educator Dashboard for educators and admins */}
              {(isEducator || isAdmin) && (
                <button
                  onClick={() => navigate(ROUTES.EDUCATOR)}
                  className="hover:text-gray-700 transition"
                >
                  Educator Dashboard
                </button>
              )}

              {/* Show Become Educator for students */}
              {!isEducator && !isAdmin && (
                <button
                  onClick={() => navigate(ROUTES.EDUCATOR)}
                  className="hover:text-gray-700 transition"
                >
                  Become Educator
                </button>
              )}

              <Link to={ROUTES.MY_ENROLLMENTS} className="hover:text-gray-700 transition">
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            {/* Role Badge */}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleBadgeClass()}`}>
              {getRoleLabel()}
            </span>

            {/* User Info */}
            <div className="flex items-center gap-2">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-sm">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.LOGIN}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Login
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {isAuthenticated && (
            <>
              {(isEducator || isAdmin) && (
                <button onClick={() => navigate(ROUTES.EDUCATOR)}>
                  Dashboard
                </button>
              )}
              <Link to={ROUTES.MY_ENROLLMENTS}>Enrollments</Link>
            </>
          )}
        </div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-xs">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-xs font-medium max-w-[60px] truncate">
                {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={ROUTES.LOGIN} className="cursor-pointer">
            <img src={assets.user_icon} alt="User" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;