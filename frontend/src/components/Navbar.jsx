// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { HiMenuAlt3 } from "react-icons/hi";

// export default function Navbar({ username, setIsSidebarOpen, title }) {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full bg-white border-b px-4 py-3 flex items-center justify-between lg:justify-between">
//       <button
//         onClick={() => setIsSidebarOpen(true)}
//         className="text-2xl absolute left-4 top-1/2-translate-y-1/2 lg:hidden bg-white text-[#6a1b9a]"
//       >
//         ☰
//       </button>

//       <div
//         className="w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[10%] rounded-[50%] bg-red-600 flex items-center justify-center text-white text-[20px]"
//         onClick={() => navigate("/")}
//       >
//         <FaArrowLeft />
//       </div>
//       {/* TITLE */}
//       <div className="flex flex-col items-center text-center w-full lg:w-auto">
//         {/* DESKTOP TITLE */}
//         <h1 className="hidden lg:block text-2xl font-bold text-[#6a1b9a]">
//           {title}
//         </h1>

//         {/* MOBILE TITLE */}
//         <div className="lg:hidden flex flex-col">
//           <h1 className="text-lg font-bold text-[#6a1b9a]">{title}</h1>
//         </div>
//       </div>

//       {/* WELCOME TEXT */}
//       <p className="hidden sm:block text-sm font-semibold text-[#022a66]">
//         Welcome, {username}!
//       </p>
//     </div>
//   );
// }
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
