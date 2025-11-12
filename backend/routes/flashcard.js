import express from "express";
import isAuth from "../middleware/isAuth.js";
import { canViewDeck, canEditDeck } from "../middleware/deckPermissions.js";

import {
  createFlashcard,
  getAllFlashcards,
  getFlashcardsById,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController.js";

const flashcardRouter = express.Router();

flashcardRouter.post("/:deckId", isAuth, canEditDeck, createFlashcard);
flashcardRouter.get("/:deckId", isAuth, canViewDeck, getAllFlashcards);
flashcardRouter.get("/flashcard/:id", isAuth, getFlashcardsById);
flashcardRouter.put("/flashcard/:id", isAuth, canEditDeck, updateFlashcard);
flashcardRouter.delete("/flashcard/:id", isAuth, canEditDeck, deleteFlashcard);

export default flashcardRouter;
