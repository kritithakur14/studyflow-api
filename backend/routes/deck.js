import express from "express";
import isAuth from "../middleware/isAuth.js";

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

deckRouter.get("/:id", isAuth, getDeckById);
deckRouter.put("/:id", isAuth, updateDeck);
deckRouter.delete("/:id", isAuth, deleteDeck);

export default deckRouter;
