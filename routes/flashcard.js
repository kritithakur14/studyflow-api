import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  createFlashcard,
  getAllFlashcards,
  getFlashcardsById,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController.js";
  
const  flashcardRouter = express.Router();

flashcardRouter.post("/:deckId", isAuth, createFlashcard);
flashcardRouter.get("/:deckId", isAuth, getAllFlashcards);
flashcardRouter.get("/flashcard/:id", isAuth, getFlashcardsById);
flashcardRouter.put("/flashcard/:id", isAuth, updateFlashcard);
flashcardRouter.delete("/flashcard/:id", isAuth, deleteFlashcard);

export default flashcardRouter;