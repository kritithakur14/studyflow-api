import Deck from "../models/Deck.js";

//create a new deck
export const createDeck = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }
    const deck = new Deck({
      title,
      description,
      tags,
      user: req.userId,
    });
    await deck.save();
    res.status(201).json({ message: "Deck created successfully", deck });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `createDeck: ${error.message}` });
  }
};

// get all decks of logged in user
export const getAllDecks = async (req, res) => {
  try {
    const { query } = req.query;
    let filter = { user: req.userId };

    if (query) {
      filter.title = { $regex: query, $options: "i" }; //search by title
    }

    const decks = await Deck.find(filter)
      .populate({
        path: "flashcards",
        select: "question answer",
      })
      .populate({
        path: "notes",
        select: "title content",
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Decks fetched successfullly",
      count: decks.length,
      decks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `getAllDecks: ${error.message}` });
  }
};

//get each deck by id
export const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    if (deck.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this deck" });
    }
    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `getDeckById: ${error.message}` });
  }
};

//update deck
export const updateDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    if (deck.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this deck" });
    }
    const { title, description, tags } = req.body;

    if (title) deck.title = title;
    if (description) deck.description = description;
    if (tags) deck.tags = tags;

    const updatedDeck = await deck.save();
    res
      .status(200)
      .json({ message: "Deck updated successfully", deck: updatedDeck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `updateDeck: ${error.message}` });
  }
};

//delete deck
export const deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    if (deck.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this deck" });
    }
    await Deck.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `deleteDeck: ${error.message}` });
  }
};
