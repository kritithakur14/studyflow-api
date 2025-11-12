import Flashcards from "../models/Flashcard.js";
import Deck from "../models/Deck.js";

//create a new flashcard
export const createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { deckId } = req.params;

    if (!question || !answer || !deckId) {
      return res
        .status(400)
        .json({ message: "Question, Answer and DeckId are required" });
    }
    //find deck
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    if (deck.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this deck" });
    }
    const newFlashcard = new Flashcards({
      question,
      answer,
      deck: deckId,
      user: req.userId,
    });
    await newFlashcard.save();

    //adding flashcard to deck's flashcards array
    deck.flashcards.push(newFlashcard._id);
    await deck.save();

    res.status(201).json({
      message: "Flashcard created successfully",
      flashcard: newFlashcard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `createFlashcard:${error.message}` });
  }
};

export const getAllFlashcards = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    if (deck.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this deck" });
    }

    //fetch all flashcards for this deck
    const flashcards = await Flashcards.find({ deck: deckId })
      .populate("deck", "title")
      .sort({
        createdAt: -1,
      });
    res.status(200).json({
      message: "All flashcards fetched successfully",
      count: flashcards.length,
      flashcards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `getAllFlashcards: ${error.message}` });
  }
};

//get flashcards by its id
export const getFlashcardsById = async (req, res) => {
  try {
    const flashcard = await Flashcards.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: "Flashcards not found" });
    }
    if (flashcard.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this flashcard" });
    }
    res.status(200).json(flashcard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `getFlashcardsById: ${error.message}` });
  }
};

//update flashcard
export const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcards.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    if (flashcard.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this flashcard" });
    }
    const { question, answer, isStarred } = req.body;

    if (question) flashcard.question = question;
    if (answer) flashcard.answer = answer;
    if (typeof isStarred === "boolean") flashcard.isStarred = isStarred;

    const updatedFlashcard = await flashcard.save();
    res.status(200).json({
      message: "Flashcard updated successfully",
      flashcard: updatedFlashcard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `updateFlashcard: ${error.message}` });
  }
};
//delete flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcards.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    if (flashcard.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this flashcard" });
    }
    await Flashcards.findByIdAndDelete(req.params.id);

    //remove flashcard from deck's flashcards array
    await Deck.findByIdAndUpdate(flashcard.deck, {
      $pull: { flashcards: flashcard._id },
    });
    res.status(200).json({ message: "Flashcard deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `deleteFlashcard: ${error.message}` });
  }
};
