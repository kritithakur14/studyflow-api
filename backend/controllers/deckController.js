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
      user: req.user._id,
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
    let filter = { user: req.user._id };

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
    const deck = await Deck.findById(req.params.id)
      .populate({
        path: "flashcards",
        select: "question answer",
      })
      .populate({
        path: "notes",
        select: "title content",
      })
      .populate({
        path: "collaborators.user",
        select: "username email",
      });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    const userId = req.user._id.toString();

    //owner can view
    if (deck.user.toString() === userId) {
      return res.status(200).json(deck);
    }

    //collaborators can view
    const isCollaborator = deck.collaborators.some(
      (collab) => collab.user._id.toString() === userId
    );
    if (isCollaborator) {
      return res.status(200).json(deck);
    }
    //else unauthorized
    return res
      .status(403)
      .json({ message: "unauthorized access to this deck" });
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
    const userId = req.user._id.toString();

    //if user is not the owner
    if (deck.user.toString() !== userId) {
      //check if collaborator has edit rights
      const collaborator = deck.collaborators.find(
        (collab) => collab.user.toString() === userId
      );
      //if not a collaborator or has view-only rights
      if (!collaborator || collaborator.role !== "editor") {
        return res
          .status(403)
          .json({ message: "You do not have permission to edit this deck" });
      }
    }

    //allowed to update
    const { title, description, tags } = req.body;

    if (title !== undefined) deck.title = title;
    if (description !== undefined) deck.description = description;
    if (tags !== undefined) deck.tags = tags;

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
    if (deck.user.toString() !== req.user._id.toString()) {
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

//add collaborator to deck
export const addCollaborator = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const deckId = req.params.id;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    //check if the user is the owner
    if (deck.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the owner can add collaborators" });
    }
    //check if the user is already a collaborator
    const existingCollaborator = deck.collaborators.find(
      (collab) => collab.user.toString() === userId
    );

    //update role if collaborator exists
    if (existingCollaborator) {
      existingCollaborator.role = role; //update role
      await deck.save();
      return res
        .status(200)
        .json({ message: "Collaborator added successfully" });
    }
    deck.collaborators.push({ user: userId, role });
    await deck.save();

    res.status(200).json({ message: "Collaborator added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `addCollaborator: ${error.message}` });
  }
};

export const removeCollaborator = async (req, res) => {
  try {
    const deckId = req.params.id;
    const userIdToRemove = req.params.userId;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    //check if the user is the owner
    if (deck.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the owner can remove collaborators" });
    }

    //remove collaborator
    deck.collaborators = deck.collaborators.filter(
      (collab) => collab.user.toString() !== userIdToRemove
    );

    await deck.save();
    return res
      .status(200)
      .json({ message: "Collaborator removed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `removeCollaborator: ${error.message}` });
  }
};

export const getPendingCollaborations = async (req, res) => {
  try {
    const decks = await Deck.find({ collaborators: req.userId });
    res.status(200).json(decks);
  } catch (error) {
    res
      .status(500)
      .json({ message: `getPendingCollaborations: ${error.message}` });
  }
};
