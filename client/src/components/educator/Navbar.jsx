
import React, { useState, useEffect } from 'react';
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const educatorData = dummyEducatorData;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 lg:w-32' />
      </Link>
      
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.name : "Developers"}</p>
        
        {user ? (
          <div className="flex items-center gap-3">
        
            {user.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.name}
                className='w-8 h-8 rounded-full object-cover'
              />
            ) : (
              <div className='w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium text-sm'>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            
          
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <img className='max-w-8' src={assets.profile_img} alt="Profile" />
        )}
      </div>
    </div>
  );
};

export default Navbar;