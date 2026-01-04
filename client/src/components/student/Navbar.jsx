import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import api from "../../utils/api";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const location = useLocation();
  const isColorListPage = location.pathname.includes("/course-list");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div className="h-16 bg-cyan-100/70"></div>; // Loading placeholder
  }

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isColorListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-30 lg:w-32 cursor-pointer h-30 rounded-t-full"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
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
          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {isEducator ? "Dashboard" : "Educator"}
              </button>
              <Link to="/my-enrollments">Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium max-w-[80px] truncate">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="cursor-pointer">
            <img src={assets.user_icon} alt="User" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;