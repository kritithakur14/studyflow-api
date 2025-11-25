import Deck from "../models/Deck.js";
import Flashcard from "../models/Flashcard.js";

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
    let deckId;

    // If URL contains /flashcard/ → this is a flashcard update/delete
    if (req.url.includes("/flashcard/")) {
      const flashcardId = req.params.id;

      const flashcard = await Flashcard.findById(flashcardId);
      if (!flashcard) {
        return res.status(404).json({ message: "Flashcard not found" });
      }

      deckId = flashcard.deck; // get correct deck id
    } else {
      // Normal deck update/delete
      deckId = req.params.id || req.params.deckId;
    }

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    if (deck.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not permitted to edit this deck" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: `canEditDeck: ${error.message}` });
  }
};
