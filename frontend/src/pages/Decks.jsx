import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Decks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [decks, setDecks] = useState([]);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editDeckId, setEditDeckId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateDeck = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newDeckTitle,
          description: newDeckDescription,
        }),
      });

      const data = await res.json();
      console.log("Deck created:", data);
      setShowModal(false);
      setNewDeckTitle("");
      setNewDeckDescription("");
      fetchDecks(); //refresh list
    } catch (error) {
      console.log("Error creating deck:", error);
    }
  };
  const fetchDecks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/decks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("decks fetched:", data);

      // Ensure data.decks is ALWAYS an array
      const list = Array.isArray(data.decks) ? data.decks : [];

      setDecks(list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDecks();
  }, []);

  const handleUpdateDeck = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/decks/${editDeckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      const data = await res.json();
      console.log("Deck updated:", data);

      setEditModal(false);
      fetchDecks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this deck?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/api/decks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.log("Delete flashcard failed");
        return;
      }

      fetchDecks();
    } catch (error) {
      console.log(error);
    }
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
          title="Decks"
        />
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        <div className=" p-6">
          <button
            className="bg-[#a749e6] text-white px-4 py-2 rounded-lg shadow
          "
            onClick={() => setShowModal(true)}
          >
            + New Deck
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-[#dbc6c6] bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-[#b061fa] p-6 rounded-lg w-96 shadow">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Create New Deck
              </h2>

              <input
                type="text"
                placeholder="Add title"
                className="w-full border p-2 rounded mb-3 text-[#b40580] bg-[#fcf6f8]"
                value={newDeckTitle}
                onChange={(e) => setNewDeckTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Add description"
                className="w-full border p-2 rounded mb-3 text-[#b40580] bg-[#fcf6f8]"
                value={newDeckDescription}
                onChange={(e) => setNewDeckDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#fcf6f8] text-[#b40580] rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDeck}
                  className="px-4 py-2 bg-[#fcf6f8] text-[#b40580] rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        {/*card grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 px-6  py-2 gap-6">
          {decks.map((deck) => (
            <div
              key={deck._id}
              className="break-inside-avoid border p-4 rounded-xl shadow bg-white hover:shadow-md transition mb-6 px-4"
            >
              <h2 className="text-sm font-sans text-[#d4203e] font-bold mb-1">
                {deck.title}
              </h2>
              <h2 className="text-sm font-sans text-[#f0405d] font-semibold mb-1">
                {deck.description}
              </h2>

              <p className="text-gray-600 mb-4 mt-2">
                {deck.flashcards?.length || 0} flashcards
              </p>

              <div className="flex gap-3 mt-3">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => {
                    setEditDeckId(deck._id);
                    setEditTitle(deck.title);
                    setEditDescription(deck.description);
                    setEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => handleDelete(deck._id)}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => navigate(`/study-items?deck=${deck._id}`)}
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Deck</h2>

            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 text-white rounded"
                onClick={handleUpdateDeck}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
