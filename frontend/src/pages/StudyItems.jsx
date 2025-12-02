import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function StudyItems() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Flashcard modal states
  const [isFlashViewModal, setIsFlashViewModal] = useState(false);
  const [isFlashEditModal, setIsFlashEditModal] = useState(false);
  const [flashcardTemp, setFlashcardTemp] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Note modal states
  const [isNoteModal, setIsNoteModal] = useState(false);
  const [isNoteEditModal, setIsNoteEditModal] = useState(false);
  const [noteTemp, setNoteTemp] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState(""); //flashcard, note

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const shorten = (txt, max = 80) =>
    txt?.length > max ? txt.slice(0, max) + "..." : txt;
  const deckParam = params.get("deck");

  // Fetch decks on page load
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/decks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.decks;
        setDecks(list || []);

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

  // Auto-select deck from URL
  useEffect(() => {
    if (deckParam && decks.length > 0) {
      const match = decks.find((d) => d._id.toString() === deckParam);
      if (match) {
        setSelectedDeck(match);
      }
    }
  }, [deckParam, decks]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const addFlashcard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/flashcards/${selectedDeck._id}`,
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

      setIsFlashEditModal(false);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateFlashcard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/flashcards/flashcard/${
          flashcardTemp._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: flashcardTemp.question,
            answer: flashcardTemp.answer,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Error updating flashcard:", data);
        return;
      }

      setSelectedDeck({
        ...selectedDeck,
        flashcards: selectedDeck.flashcards.map((c) =>
          c._id === flashcardTemp._id ? data.flashcard : c
        ),
      });

      setIsFlashEditModal(false);
      setFlashcardTemp(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/${selectedDeck._id}`,
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
      setIsNoteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/${noteTemp._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: noteTemp.title,
            content: noteTemp.content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) return console.log("Update note error:", data);

      setSelectedDeck({
        ...selectedDeck,
        notes: selectedDeck.notes.map((n) =>
          n._id === noteTemp._id ? data.note : n
        ),
      });

      setIsNoteEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      if (deleteType === "flashcard") {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/flashcards/flashcard/${deleteTarget}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          setSelectedDeck({
            ...selectedDeck,
            flashcards: selectedDeck.flashcards.filter(
              (c) => c._id !== deleteTarget
            ),
          });
        }
      }

      if (deleteType === "note") {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notes/${deleteTarget}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          setSelectedDeck({
            ...selectedDeck,
            notes: selectedDeck.notes.filter((n) => n._id !== deleteTarget),
          });
        }
      }

      setConfirmOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.log(err);
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

        {/*  PAGE CONTENT  */}
        <div className="flex-1 p-10 overflow-y-auto">
          {/* SELECT DECK DROPDOWN  */}
          <label className="text-lg text-[#022a66] font-semibold">
            Select Deck:
          </label>

          <select
            className="block w-56 md:w-1/3 mt-2 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9752e6]"
            value={selectedDeck?._id || ""}
            onChange={(e) => {
              const deckId = e.target.value;
              const match = decks.find((d) => d._id.toString() === deckId);
              setSelectedDeck(match);
            }}
          >
            {decks.map((deck) => (
              <option key={deck._id} value={deck._id}>
                {deck.title}
              </option>
            ))}
          </select>

          {/* FLASHCARDS SECTION  */}
          {selectedDeck ? (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-[#022a66]">
                  Flashcards
                </h2>

                <button
                  className="bg-[#aabadb] text-[#061f44] px-4 py-2 rounded-lg shadow"
                  onClick={() => {
                    setQuestion("");
                    setAnswer("");
                    setIsFlashEditModal(true);
                  }}
                >
                  + Add Flashcard
                </button>
              </div>

              {Array.isArray(selectedDeck.flashcards) &&
              selectedDeck.flashcards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDeck.flashcards.map((card) => (
                    <div
                      key={card._id}
                      className="p-4 border rounded-lg bg-white shadow-sm text-[#20406e] break-words"
                    >
                      <p className="font-semibold break-all whitespace-normal">
                        {shorten(card.question, 60)}
                      </p>
                      <p className="text-gray-700 mt-1 break-all whitespace-normal">
                        {shorten(card.answer, 80)}
                      </p>

                      <div className="flex gap-4 mt-3">
                        <button
                          className="bg-[#4f7b8d] text-[#f7fafa] font-bold"
                          onClick={() => {
                            setFlashcardTemp(card);
                            setIsFlashViewModal(true);
                          }}
                        >
                          View Full
                        </button>

                        <button
                          className="bg-[#4f7b8d] text-[#f7fafa] font-bold"
                          onClick={() => {
                            setFlashcardTemp(card);
                            true;
                            setIsFlashEditModal(true);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="bg-[#4f7b8d] text-[#f7fafa] font-bold"
                          onClick={() => {
                            setDeleteTarget(card._id);
                            setDeleteType("flashcard");
                            setConfirmOpen(true);
                          }}
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

          {/* NOTES SECTION */}
          {selectedDeck && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-[#022a66]">Notes</h2>

                <button
                  className="bg-[#aabadb] text-[#061f44]  px-4 py-2 rounded-lg shadow"
                  onClick={() => {
                    setNoteTitle("");
                    setNoteContent("");
                    setIsNoteModal(true);
                  }}
                >
                  + Add Note
                </button>
              </div>

              {selectedDeck?.notes?.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
              ) : (
                <div className="space-y-4">
                  {selectedDeck.notes.map((note) => (
                    <div
                      key={note._id}
                      className="p-4 border rounded-lg bg-white shadow-sm text-[#20406e] break-words"
                    >
                      <p className="font-semibold break-all whitespace-normal">
                        {note.title}
                      </p>
                      <p className="text-gray-700 mt-1 break-all whitespace-normal">
                        {note.content}
                      </p>

                      <div className="flex gap-6 mt-4">
                        <button
                          className="bg-[#4f7b8d] text-[#f7fafa] font-bold"
                          onClick={() => {
                            setNoteTemp(note);
                            setIsNoteEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-[#4f7b8d] text-[#f7fafa] font-bold"
                          onClick={() => {
                            setDeleteTarget(note._id);
                            setDeleteType("note");
                            setConfirmOpen(true);
                          }}
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
      {/*  VIEW FLASHCARD MODAL */}
      {isFlashViewModal && flashcardTemp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#05214b]">
              Flashcard Details
            </h2>

            <p className="font-semibold mb-2">Question:</p>
            <p className="p-2 border rounded bg-gray-100 whitespace-pre-wrap">
              {flashcardTemp.question}
            </p>

            <p className="font-semibold mt-4 mb-2">Answer:</p>
            <p className="p-2 border rounded bg-gray-100 whitespace-pre-wrap">
              {flashcardTemp.answer}
            </p>

            <button
              className="mt-4 w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded"
              onClick={() => setIsFlashViewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/*  FLASHCARD EDIT MODAL  */}
      {isFlashEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#dddbdb] p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#061f44]">
              {flashcardTemp ? "Edit Flashcard" : "Add Flashcard"}
            </h2>

            <input
              className="w-full border p-2 rounded mb-3 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={flashcardTemp ? flashcardTemp.question : question}
              onChange={(e) =>
                flashcardTemp
                  ? setFlashcardTemp({
                      ...flashcardTemp,
                      question: e.target.value,
                    })
                  : setQuestion(e.target.value)
              }
            />

            <input
              className="w-full border p-2 rounded mb-3 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={flashcardTemp?.answer || answer}
              onChange={(e) =>
                flashcardTemp
                  ? setFlashcardTemp({
                      ...flashcardTemp,
                      answer: e.target.value,
                    })
                  : setAnswer(e.target.value)
              }
            />

            <button
              className="w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded"
              onClick={flashcardTemp ? updateFlashcard : addFlashcard}
            >
              {flashcardTemp ? "Save Changes" : "Add Flashcard"}
            </button>

            <button
              className="w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded mt-2"
              onClick={() => {
                setIsFlashEditModal(false);
                setFlashcardTemp(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#f1efef] p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#05214b]">
              Add Note
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded mb-3 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              className="w-full p-2 rounded mb-3 h-32 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>

            <button
              className="w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded"
              onClick={addNote}
            >
              Add Note
            </button>

            <button
              className="mt-2 w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded"
              onClick={() => setIsNoteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/*  NOTE EDIT MODAL  */}
      {isNoteEditModal && noteTemp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#dddbdb] p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#05214b]">
              Edit Note
            </h2>

            <input
              className="w-full border p-2 rounded mb-3 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={noteTemp.title}
              onChange={(e) =>
                setNoteTemp({ ...noteTemp, title: e.target.value })
              }
            />

            <textarea
              className="w-full border p-2 rounded mb-3 h-32 text-[#061f44] bg-[#fcf6f8] focus:outline-none focus:ring-2 focus:ring-[#657b99]"
              value={noteTemp.content}
              onChange={(e) =>
                setNoteTemp({ ...noteTemp, content: e.target.value })
              }
            ></textarea>

            <button
              className="w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded"
              onClick={updateNote}
            >
              Save Changes
            </button>

            <button
              className="w-full bg-[#9a9ad3] text-[#02164d] p-2 rounded mt-2"
              onClick={() => setIsNoteEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message={
          deleteType === "flashcard"
            ? "Are you sure you want to delete this flashcard?"
            : "Are you sure you want to delete this note?"
        }
      />
    </div>
  );
}
