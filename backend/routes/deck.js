import express from "express";
import isAuth from "../middleware/isAuth.js";
import { canViewDeck, canEditDeck } from "../middleware/deckPermissions.js";
import {
  addCollaborator,
  getPendingCollaborations,
  removeCollaborator,
} from "../controllers/deckController.js";
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
deckRouter.get("/pending/all", isAuth, getPendingCollaborations);

deckRouter.get("/:id", isAuth, canViewDeck, getDeckById);
deckRouter.put("/:id", isAuth, canEditDeck, updateDeck);
deckRouter.delete("/:id", isAuth, canEditDeck, deleteDeck);

//add collaborator to deck
deckRouter.post("/:id/collaborators", isAuth, canEditDeck, addCollaborator);

//remove collaborator from deck
deckRouter.delete(
  "/:id/collaborators/:userId",
  isAuth,
  canEditDeck,
  removeCollaborator
);

export default deckRouter;
