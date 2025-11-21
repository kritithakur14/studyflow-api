import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  //Check for user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  //Read user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        <Navbar username={user?.username} setIsSidebarOpen={setIsSidebarOpen} />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        <div className="p-4 sm:p-6">
          {/* CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* USERS CARD */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">0</p>
            </div>

            {/* STUDY ITEMS CARD */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Study Items
              </h3>
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">0</p>
            </div>

            {/* COLLABORATION CARD */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Pending Collaborations
              </h3>
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">0</p>
            </div>
          </div>
          {/* RECENT ACTIVITY */}
          <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-[#6a1b9a] mb-4 mt-4">
              Recent Activity
            </h3>

            <ul className="text-[#022a66] space-y-2">
              <li className="text-gray-500 italic">
                No recent activity yet...
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
