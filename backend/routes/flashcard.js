import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  createFlashcard,
  getAllFlashcards,
  getFlashcardsById,
  updateFlashcard,
  deleteFlashcard,
  getFlashcardCount,
} from "../controllers/flashcardController.js";

const flashcardRouter = express.Router();

flashcardRouter.post("/:deckId", isAuth, createFlashcard);

flashcardRouter.get("/flashcard/:id", isAuth, getFlashcardsById);
flashcardRouter.put("/flashcard/:id", isAuth, updateFlashcard);
flashcardRouter.delete("/flashcard/:id", isAuth, deleteFlashcard);
flashcardRouter.get("/count/all", isAuth, getFlashcardCount);

flashcardRouter.get("/", isAuth, getAllFlashcards);
flashcardRouter.get("/:deckId", isAuth, getAllFlashcards);

export default flashcardRouter;
