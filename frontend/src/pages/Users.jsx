import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
          title="Users"
        />
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-[#022a66]">Users</h1>
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            No users found (placeholder)
          </div>
        </div>
      </div>
    </div>
  );
}
