import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const noteRouter = express.Router();
noteRouter.post("/", isAuth, createNote);
noteRouter.get("/", isAuth, getAllNotes);
noteRouter.get("/:id", isAuth, getNoteById);
noteRouter.put("/:id", isAuth, updateNote);
noteRouter.delete("/:id", isAuth, deleteNote);

export default noteRouter;
