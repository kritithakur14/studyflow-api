
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";

export default function Navbar({ username, setIsSidebarOpen, title }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#eef1f7] shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        
        {/* Sidebar toggle for mobile */}
        <button
          className="lg:hidden text-[#022a66] text-1xl mr-2 bg-white"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <HiMenuAlt3 />
        </button>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-lg border border-gray-300 shadow-sm 
                     hover:bg-gray-100 text-[#022a66]"
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Forward button */}
        <button
          onClick={() => navigate(1)}
          className="p-2 bg-white rounded-lg border border-gray-300 shadow-sm 
                     hover:bg-gray-100 text-[#022a66]"
        >
          <FiArrowRight size={20} />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-[#022a66]">{title}</h1>
      </div>

      {/* Username */}
      <p className="hidden sm:block text-[#022a66] font-medium">
        Hi, {username} :)
      </p>
    </nav>
  );
}
