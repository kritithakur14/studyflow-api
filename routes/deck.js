import express from "express";
import isAuth from "../middleware/isAuth.js";
import { canViewDeck, canEditDeck } from "../middleware/deckPermissions.js";
import {
  createDeck,
  getAllDecks,
  getDeckById,
  updateDeck,
  deleteDeck,
} from "../controllers/deckController.js";

const deckRouter = express.Router();

deckRouter.post("/", isAuth, createDeck);
deckRouter.get("/", isAuth, getAllDecks);
deckRouter.get("/:id", isAuth, canViewDeck, getDeckById);
deckRouter.put("/:id", isAuth, canEditDeck, updateDeck);
deckRouter.delete("/:id", isAuth, canEditDeck, deleteDeck);

export default deckRouter;
