import Notes from "../models/Notes.js";
import Flashcard from "../models/Flashcard.js";
import Deck from "../models/Deck.js";

export const getRecentActivity = async (req, res) => {
  try {
    const userId = req.userId;

    // latest activity from all 3 collections
    const latestNote = await Notes.findOne({ user: userId }).sort({ updatedAt: -1 });
    const latestFlash = await Flashcard.findOne({ user: userId }).sort({ updatedAt: -1 });
    const latestDeck = await Deck.findOne({ user: userId }).sort({ updatedAt: -1 });

    const timestamps = [
      latestNote?.updatedAt,
      latestFlash?.updatedAt,
      latestDeck?.updatedAt,
    ].filter(Boolean);

    if (timestamps.length === 0) {
      return res.json({
        lastActive: null,
        streak: 0,
      });
    }

    const lastActive = new Date(Math.max(...timestamps));

    // calculate streak
    const today = new Date();
    const diff =
      (today.setHours(0, 0, 0, 0) -
        new Date(lastActive).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24);

    let streak = diff === 0 ? 1 : 0;

    return res.json({ lastActive, streak });
  } catch (error) {
    res.status(500).json({ message: `getRecentActivity: ${error.message}` });
  }
};
