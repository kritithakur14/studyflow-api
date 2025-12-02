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
  const [totalStudyItems, setTotalStudyItems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState("");

  //Auth Check for user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  //total users
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const data = await res.json();
  //       setTotalUsers(data.length);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stats/overview`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        setTotalDecks(Number(data.totalDecks) || 0);
        setTotalNotes(Number(data.totalNotes) || 0);
        setTotalFlashcards(Number(data.totalFlashcards) || 0);
        setTotalStudyItems(Number(data.totalStudyItems) || 0);
      } catch (err) {
        console.log("Stats fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  const quotes = [
    "Self belief and hard work will always earn you success.",
    "Start before you are ready. Progress beats perfection",
    "Small progress is still progress.",
    "You're doing better than you think.",
    "Consistency creates confidence.",
    "One small step today leads to big success tomorrow.",
    "You only fail if you stop trying.",
    "The best time to start was yesterday. The next best is now.",
  ];

  useEffect(() => {
    // Random motivational quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Fetch activity streak
    const fetchStreak = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/activity`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setStreak(data.streak || 0);
      } catch (err) {
        console.log("Activity fetch error:", err);
      }
    };

    fetchStreak();
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
        <Navbar
          username={user?.username}
          setIsSidebarOpen={setIsSidebarOpen}
          title="Dashboard Overview"
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        <div className="flex flex-col items-center gap-6 mt-6">
          {/* CARDS ROW */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"> */}
          {/* USERS CARD */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-[#022a66]">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-[#426ea0] mt-2">
                {totalUsers}
              </p>
            </div> */}

          {/* STUDY ITEMS CARD */}

          <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-6">
            <h3 className="text-lg font-semibold text-[#022a66]">
              Study Items
            </h3>
            <p className="text-3xl font-bold text-[#426ea0] mt-2">
              {totalStudyItems}
            </p>
          </div>
        </div>
        {/* STUDY STREAK */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-6">
          <h3 className="text-lg font-semibold text-[#022a66]">Study Streak</h3>
          <p className="text-2xl font-bold text-[#426ea0] mt-2">
            {streak > 0
              ? `${streak} day${streak > 1 ? "s" : ""} 🔥`
              : "No streak yet"}
          </p>
        </div>

        {/* MOTIVATIONAL QUOTE */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-6">
          <h3 className="text-lg font-semibold text-[#022a66] mb-2">
            Today's Motivation
          </h3>
          <p className="text-md text-[#426ea0] italic">“{quote}”</p>
        </div>
      </div>
    </div>
  );
}
