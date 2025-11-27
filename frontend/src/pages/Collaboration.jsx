import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Collaboration() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [collabEmail, setCollabEmail] = useState("");
  const [collabRole, setCollabRole] = useState("viewer");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const deckParam = params.get("deck");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------------------- FETCH DECKS ----------------------
  const fetchDecks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/decks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const list = Array.isArray(data.decks) ? data.decks : [];
      setDecks(list);

      // URL deck param
      if (deckParam && list.length > 0) {
        const exists = list.find((d) => d._id.toString() === deckParam);
        if (exists) {
          setSelectedDeckId(deckParam);
          return;
        }
      }

      // Default select first deck
      if (list.length > 0 && !selectedDeckId) {
        setSelectedDeckId(list[0]._id.toString());
      }
    } catch (error) {
      console.log("Error fetching decks:", error);
    }
  };

  useEffect(() => {
    fetchDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedDeck = decks.find((d) => d._id.toString() === selectedDeckId);

  // ---------------------- ADD COLLABORATOR ----------------------
  const handleAddCollaborator = async () => {
    if (!selectedDeckId) {
      alert("Please select a deck first");
      return;
    }
    if (!collabEmail.trim()) {
      alert("Please enter an email or username");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/decks/${selectedDeckId}/collaborators`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            identifier: collabEmail, // email or username
            role: collabRole,
          }),
        }
      );

      const result = await res.json();
      console.log("ADD COLLAB RESPONSE:", result);

      if (!res.ok) {
        alert(result.message || "Failed to add collaborator");
        return;
      }

      setCollabEmail("");
      setCollabRole("viewer");
      fetchDecks();
    } catch (error) {
      console.log("Error adding collaborator:", error);
    }
  };

  // ---------------- REMOVE COLLABORATOR ----------------
  const handleRemoveCollaborator = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/decks/${selectedDeckId}/collaborators/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();
      console.log("REMOVE COLLAB RESPONSE:", result);

      if (!res.ok) {
        alert(result.message || "Failed to remove collaborator");
        return;
      }

      fetchDecks();
    } catch (error) {
      console.log("Error removing collaborator:", error);
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
          title="Collaboration"
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        <div className="flex-1 p-8 overflow-y-auto">
          {/* ------------------ PAGE TITLE ------------------ */}
          <h1 className="text-2xl font-semibold mb-4 text-[#022a66]">
            Manage Collaboration
          </h1>

          {/* ------------------ DECK DROPDOWN ------------------ */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Deck
            </label>

            <select
              className="block w-64 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9752e6]"
              value={selectedDeckId}
              onChange={(e) => setSelectedDeckId(e.target.value)}
            >
              {decks.map((deck) => (
                <option key={deck._id} value={deck._id}>
                  {deck.title}
                </option>
              ))}
            </select>
          </div>

          {/* ------------------ DECK DETAILS ------------------ */}
          {selectedDeck ? (
            <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm max-w-xl mx-auto">
              <p className="font-semibold text-lg text-[#022a66]">
                {selectedDeck.title}
              </p>
              <p className="text-gray-600">{selectedDeck.description}</p>
            </div>
          ) : (
            <p className="text-gray-600">No deck selected.</p>
          )}

          {/* ------------------ ADD COLLABORATOR ------------------ */}
          <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-[#022a66]">
              Add Collaborator
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter email or username"
                className="border p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#9752e6]"
                value={collabEmail}
                onChange={(e) => setCollabEmail(e.target.value)}
              />

              <select
                className="border p-2 rounded w-full bg-white"
                value={collabRole}
                onChange={(e) => setCollabRole(e.target.value)}
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>

              <button
                className="bg-[#102d6b] text-white px-4 py-2 rounded-lg w-full hover:bg-[#414188] transition"
                onClick={handleAddCollaborator}
              >
                Add Collaborator
              </button>
            </div>
          </div>

          {/* ------------------ CURRENT COLLABORATORS ------------------ */}
          <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#022a66]">
              Collaborators
            </h2>

            {!selectedDeck?.collaborators ||
            selectedDeck.collaborators.length === 0 ? (
              <p className="text-gray-600">No collaborators yet.</p>
            ) : (
              <div className="space-y-3">
                {selectedDeck.collaborators.map((c) => {
                  const u = c.user || {};
                  return (
                    <div
                      key={u._id || Math.random()}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <div>
                        <p className="font-semibold text-[#20406e]">
                          {u.username || u.email || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-600">Role: {c.role}</p>
                      </div>

                      <button
                        className="px-3 py-1 bg-red-200 text-red-700 rounded "
                        onClick={() => handleRemoveCollaborator(u._id)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
