import Deck from "../models/Deck.js";

export const canViewDeck = async (req, res, next) => {
  try {
    const deckId = req.params.id || req.params.deckId;
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    if (deck.isPublic) {
      return next();
    }
    if (deck.user.toString() === req.user._id.toString()) {
      return next();
    }
    const isCollaborator = deck.collaborators.some(
      (collab) => collab.user.toString() === req.user._id.toString()
    );

    if (isCollaborator) {
      return next();
    }

    return res
      .status(403)
      .json({ message: "You do not have permission to view this deck" });
  } catch (error) {
    return res.status(500).json({ message: `canViewDeck: ${error.message}` });
  }
};

export const canEditDeck = async (req, res, next) => {
  try {
    const deckId = req.params.id || req.params.deckId;
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    if (deck.user.toString() === req.user._id.toString()) {
      return next();
    }
    const isCollaborator = deck.collaborators.find(
      (collab) => collab.user.toString() === req.user._id.toString()
    );

    if (isCollaborator && isCollaborator.role === "editor") {
      return next();
    }

    return res
      .status(403)
      .json({ message: "You do not have permission to edit this deck" });
  } catch (error) {
    return res.status(500).json({ message: `canEditDeck: ${error.message}` });
  }
};
