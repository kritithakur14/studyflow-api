import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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
        <Navbar
          username={user?.username}
          setIsSidebarOpen={setIsSidebarOpen}
          title="Settings"
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        {/* Main content */}
        <div className="p-4 sm:p-6">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-[#6a1b9a] mb-4">
              My Profile
            </h3>
            <p className="text-[#022a66]">
              <strong>Username:</strong> {user?.username || "N/A"}
            </p>
            <p className="text-[#022a66] mt-2">
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
          </div>

          {/* Theme Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-[#6a1b9a] mb-2">
              Theme Settings
            </h3>
            <p className="text-gray-600 italic">Dark mode -- coming soon</p>
          </div>

          {/* Account Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-[#6a1b9a] mb-2">
              Account Options
            </h3>
            <p className="text-gray-600 italic">
              Change password -- coming soon
            </p>
            <p className="text-gray-600 italic mt-1">
              Delete account -- coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
