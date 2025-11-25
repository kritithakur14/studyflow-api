import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudyItems() {
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
        handleLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          username={user?.username}
          setIsSidebarOpen={setIsSidebarOpen}
          title="Study Items"
        />
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-[#022a66]">Study Items</h1>
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            No study items yet.
          </div>
        </div>
      </div>
    </div>
  );
}
