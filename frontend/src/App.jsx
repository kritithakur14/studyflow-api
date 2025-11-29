import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DeckDetails from "./pages/DeckDetails";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users";

import StudyItems from "./pages/StudyItems";
import Settings from "./pages/Settings";
import Decks from "./pages/Decks";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deck/:id" element={<DeckDetails />} />
        <Route path="/users" element={<Users />} />
       
        <Route path="/decks" element={<Decks />} />
        <Route path="/study-items" element={<StudyItems />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
