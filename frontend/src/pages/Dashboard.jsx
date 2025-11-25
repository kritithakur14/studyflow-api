import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDecks, setTotalDecks] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalFlashcards, setTotalFlashcards] = useState(0);
  const [pendingCollabs, setPendingCollabs] = useState(0);

  //Auth Check for user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  //total users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

 

  // total notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/notes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setTotalNotes(data.length);
      } catch (err) {
        console.log("Notes fetch error:", err);
      }
    };
    fetchNotes();
  }, []);

  // total flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/flashcards/count/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setTotalFlashcards(data.totalFlashcards || 0);
      } catch (err) {
        console.log("Flashcards count error:", err);
      }
    };
    fetchFlashcards();
  }, []);

   //total decks
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/decks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setTotalDecks(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDecks();
  }, []);

  //pendind collabs
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/decks/pending/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setPendingCollabs(Array.isArray(data) ? data.length : 0);

      } catch (err) {
        console.log(err);
      }
    };

    fetchPending();
  }, []);

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
        <Navbar username={user?.username} setIsSidebarOpen={setIsSidebarOpen} 
        title="Dashboard Overview"/>

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
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">
                {totalUsers}
              </p>
            </div>

            {/* STUDY ITEMS CARD */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Study Items
              </h3>
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">
                {(totalDecks || 0) + (totalNotes || 0) + (totalFlashcards || 0)}
              </p>
            </div>

            {/* COLLABORATION CARD */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Pending Collaborations
              </h3>
              <p className="text-3xl font-bold text-[#6a1b9a] mt-2">
                {pendingCollabs}
              </p>
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
