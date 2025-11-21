import React from "react";

export default function Navbar({ username, setIsSidebarOpen }) {
  return (
    <div className="w-full bg-white border-b px-4 py-3 flex items-center justify-between lg:justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-2xl absolute left-4 top-1/2-translate-y-1/2 lg:hidden bg-white text-[#6a1b9a]"
      >
        ☰
      </button>

      {/* TITLE */}
      <div className="flex flex-col items-center text-center w-full lg:w-auto">
         {/* DESKTOP TITLE */}
        <h1 className="hidden lg:block text-2xl font-bold text-[#6a1b9a]">
          Dashboard Overview
        </h1>

        {/* MOBILE TITLE */}
        <div className="lg:hidden flex flex-col">
          <h1 className="text-lg font-bold text-[#6a1b9a]">Dashboard</h1>
          <span className="text-sm font-semibold text-[#6a1b9a]">Overview</span>
        </div>
      </div>

      {/* WELCOME TEXT */}
      <p className="hidden sm:block text-sm font-semibold text-[#022a66]">
        Welcome, {username}!
      </p>
    </div>
  );
}
