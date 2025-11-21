import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, handleLogout }) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-3/4 max-w-[260px]  bg-[#a9a9e0] p-6 flex flex-col z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:w-64 lg:translate-x-0 lg:static
      `}
    >
      {/* Logo */}
      <h2 className="text-4xl text-center text-[#9c0235] font-meow font-bold mb-8">
        StudyFlow
      </h2>

      {/* NAVIGATION */}
      <nav className="flex flex-col space-y-3 flex-grow text-[#022a66] font-semibold">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg cursor-pointer transition text-[#022a66] ${
              isActive ? "bg-[#c3c3ec]" : "hover:bg-[#c3c3ec]"
            } `
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg cursor-pointer transition text-[#022a66] ${
              isActive ? "bg-[#c3c3ec]" : "hover:bg-[#c3c3ec]"
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/collaboration"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg  text-[#022a66] cursor-pointer transition ${
              isActive ? "bg-[#c3c3ec]" : "hover:bg-[#c3c3ec]"
            }`
          }
        >
          Collaboration
        </NavLink>
        <NavLink
          to="/study-items"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg  text-[#022a66] cursor-pointer transition ${
              isActive ? "bg-[#c3c3ec]" : "hover:bg-[#c3c3ec]"
            }`
          }
        >
          Study Items
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg  text-[#022a66] cursor-pointer transition ${
              isActive ? "bg-[#c3c3ec]" : "hover:bg-[#c3c3ec]"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-[#b3b3e8] rounded-lg text-[#022a66] text-[17px] font-semibold hover:bg-[#8c99c4] transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
