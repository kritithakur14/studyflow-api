import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudyItems() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Flashcard modal states
  const [isFlashModalOpen, setIsFlashModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [isEditFlashModalOpen, setIsEditFlashModalOpen] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  // Note modal states
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Fetch decks on page load
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/decks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // Set only array of decks
        setDecks(Array.isArray(data.decks) ? data.decks : []);

        if (data.decks.length > 0) {
          setSelectedDeck(data.decks[0]);
          console.log("DECKS FROM BACKEND:", data.decks);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDecks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const addFlashcard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/flashcards/${selectedDeck._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question, answer }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Error adding flashcard:", data);
        return;
      }

      // Update UI without reloading
      setSelectedDeck({
        ...selectedDeck,
        flashcards: [...selectedDeck.flashcards, data.flashcard],
      });

      // Reset + close
      setQuestion("");
      setAnswer("");
      setIsFlashModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFlashcard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/flashcards/flashcard/${editingFlashcard._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: editingFlashcard.question,
            answer: editingFlashcard.answer,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Error updating flashcard:", data);
        return;
      }

      // // Update UI
      // const updatedList = selectedDeck.flashcards.map((card) =>
      //   card._id === editingFlashcard._id ? data.flashcard : card
      // );

      setSelectedDeck({
        ...selectedDeck,
        flashcards: selectedDeck.flashcards.map((c) =>
          c._id === editingFlashcard._id ? data.flashcard : c
        ),
      });

      setIsEditFlashModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/flashcards/flashcard/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        console.log("Delete flashcard failed");
        return;
      }

      setSelectedDeck({
        ...selectedDeck,
        flashcards: selectedDeck.flashcards.filter((c) => c._id !== id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/notes/${selectedDeck._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: noteTitle,
            content: noteContent,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Error adding note:", data);
        return;
      }

      // update UI instantly
      setSelectedDeck({
        ...selectedDeck,
        notes: [...selectedDeck.notes, data.note],
      });

      // reset form
      setNoteTitle("");
      setNoteContent("");
      setIsNoteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/api/notes/${editingNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingNote.title,
            content: editingNote.content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) return console.log("Update note error:", data);

      setSelectedDeck({
        ...selectedDeck,
        notes: selectedDeck.notes.map((n) =>
          n._id === editingNote._id ? data.note : n
        ),
      });

      setIsEditNoteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return console.log("Delete note failed");

      setSelectedDeck({
        ...selectedDeck,
        notes: selectedDeck.notes.filter((n) => n._id !== id),
      });
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
          title="Study Items"
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          ></div>
        )}

        {/* ------- PAGE CONTENT ------- */}
        <div className="flex-1 p-10 overflow-y-auto">
          {/* ---------- SELECT DECK DROPDOWN ---------- */}
          <label className="text-lg font-semibold">Select Deck:</label>

          <select
            className="block w-56 md:w-1/3 mt-2 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9752e6]"
            value={selectedDeck?._id || ""}
            onChange={(e) => {
              const deckId = e.target.value;
              const match = decks.find((d) => d._id.toString() === deckId);
              // console.log("Matched deck:", match);
              setSelectedDeck(match);
            }}
          >
            {decks.map((deck) => (
              <option key={deck._id} value={deck._id}>
                {deck.title}
              </option>
            ))}
          </select>

          {/* ---------- FLASHCARDS SECTION ---------- */}
          {selectedDeck ? (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-[#022a66]">
                  Flashcards
                </h2>

                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
                  onClick={() => setIsFlashModalOpen(true)}
                >
                  + Add Flashcard
                </button>
              </div>

              {/* SAFE CHECK FOR FLASHCARDS */}
              {Array.isArray(selectedDeck.flashcards) &&
              selectedDeck.flashcards.length > 0 ? (
                <div className="space-y-4">
                  {selectedDeck.flashcards.map((card) => (
                    <div
                      key={card._id}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <p className="font-semibold">{card.question}</p>
                      <p className="text-gray-700 mt-1">{card.answer}</p>

                      <div className="flex gap-6 mt-4">
                        <button
                          className="text-blue-600 font-medium"
                          onClick={() => {
                            setEditingFlashcard(card);
                            setIsEditFlashModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 font-medium"
                          onClick={() => deleteFlashcard(card._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No flashcards yet.</p>
              )}
            </div>
          ) : null}

          {/* ---------- NOTES SECTION ---------- */}
          {selectedDeck && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-[#022a66]">Notes</h2>

                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
                  onClick={() => setIsNoteModalOpen(true)}
                >
                  + Add Note
                </button>
              </div>

              {selectedDeck.notes?.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
              ) : (
                <div className="space-y-4">
                  {selectedDeck.notes.map((note) => (
                    <div
                      key={note._id}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <p className="font-semibold">{note.title}</p>
                      <p className="text-gray-700 mt-1">{note.content}</p>

                      <div className="flex gap-6 mt-4">
                        <button
                          className="text-blue-600 font-medium"
                          onClick={() => {
                            setEditingNote(note);
                            setIsEditNoteModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 font-medium"
                          onClick={() => deleteNote(note._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isFlashModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Add Flashcard</h2>

            <input
              type="text"
              placeholder="Question"
              className="w-full border p-2 rounded mb-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <input
              type="text"
              placeholder="Answer"
              className="w-full border p-2 rounded mb-3"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              onClick={addFlashcard}
              className="w-full bg-purple-600 text-white p-2 rounded"
            >
              Add
            </button>

            <button
              className="mt-2 w-full bg-gray-300 p-2 rounded"
              onClick={() => setIsFlashModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* ------------ FLASHCARD EDIT MODAL ------------ */}
      {isEditFlashModalOpen && editingFlashcard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Flashcard</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              value={editingFlashcard.question}
              onChange={(e) =>
                setEditingFlashcard({
                  ...editingFlashcard,
                  question: e.target.value,
                })
              }
            />

            <input
              className="w-full border p-2 rounded mb-3"
              value={editingFlashcard.answer}
              onChange={(e) =>
                setEditingFlashcard({
                  ...editingFlashcard,
                  answer: e.target.value,
                })
              }
            />

            <button
              className="w-full bg-purple-600 text-white p-2 rounded"
              onClick={updateFlashcard}
            >
              Save Changes
            </button>

            <button
              className="w-full bg-gray-300 p-2 rounded mt-2"
              onClick={() => setIsEditFlashModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Add Note</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded mb-3"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              className="w-full border p-2 rounded mb-3 h-32"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>

            <button
              className="w-full bg-purple-600 text-white p-2 rounded"
              onClick={addNote}
            >
              Add Note
            </button>

            <button
              className="mt-2 w-full bg-gray-300 p-2 rounded"
              onClick={() => setIsNoteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* ------------ NOTE EDIT MODAL ------------ */}
      {isEditNoteModalOpen && editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Note</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  title: e.target.value,
                })
              }
            />

            <textarea
              className="w-full border p-2 rounded mb-3 h-32"
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  content: e.target.value,
                })
              }
            ></textarea>

            <button
              className="w-full bg-purple-600 text-white p-2 rounded"
              onClick={updateNote}
            >
              Save Changes
            </button>

            <button
              className="w-full bg-gray-300 p-2 rounded mt-2"
              onClick={() => setIsEditNoteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
