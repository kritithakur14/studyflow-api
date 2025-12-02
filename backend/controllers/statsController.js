// import Deck from "../models/Deck.js";
// import Notes from "../models/Notes.js";
// import Flashcard from "../models/Flashcard.js";

// export const getUserStats = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const totalDecks = await Deck.countDocuments({ user: userId });
//     const totalNotes = await Notes.countDocuments({ user: userId });
//     const totalFlashcards = await Flashcard.countDocuments({ user: userId });

//     const totalStudyItems = totalNotes + totalFlashcards;

//     res.status(200).json({
//       totalDecks,
//       totalNotes,
//       totalFlashcards,
//       totalStudyItems,
//     });
//   } catch (error) {
//     res.status(500).json({ message: `getUserStats: ${error.message}` });
//   }
// };
import Deck from "../models/Deck.js";
import Notes from "../models/Notes.js";
import Flashcard from "../models/Flashcard.js";

export const getUserStats = async (req, res) => {
  try {
    const userId = req.userId;

    // get all decks of this user
    const decks = await Deck.find({ user: userId }).select("_id");

    let totalStudyItems = 0;
    let totalDecks = decks.length;

    let totalNotes = 0;
    let totalFlashcards = 0;

    for (const deck of decks) {
      const notes = await Notes.countDocuments({ deck: deck._id });
      const flashcards = await Flashcard.countDocuments({ deck: deck._id });

      totalNotes += notes;
      totalFlashcards += flashcards;

      totalStudyItems += notes + flashcards;
    }

    res.status(200).json({
      totalDecks,
      totalNotes,
      totalFlashcards,
      totalStudyItems, // THIS is the 6 you want
    });

  } catch (error) {
    res.status(500).json({ message: `getUserStats: ${error.message}` });
  }
};
