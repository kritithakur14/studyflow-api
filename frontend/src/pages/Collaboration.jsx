import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Collaboration() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="flex h-screen w-screen">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#022a66]">Collaboration</h1>
        <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
          No collaboration requests
        </div>
      </div>
    </div>
  );
}
