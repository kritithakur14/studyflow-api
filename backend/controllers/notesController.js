import Notes from "../models/Notes.js";
import Deck from "../models/Deck.js";

//create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { deckId } = req.params;
    if (!title || !content || !deckId) {
      return res
        .status(400)
        .json({ message: "Title, Content and decId are required" });
    }
    const note = new Notes({
      title,
      content,
      user: req.userId,
      deck: deckId,
    });
    await note.save();

    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `createNote: ${error.message}` });
  }
};

// get all notes of logged in user
export const getAllNotes = async (req, res) => {
  try {
    const { deckId, search } = req.query;

    //fetching notes of the logged in user
    let filter = { user: req.userId };

    //filtering by deck
    if (deckId) {
      filter.deck = deckId;
    }

    //filtering by search query
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const notes = await Notes.find(filter)
      .populate("deck", "title")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      message: "Notes fetched successfully",
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `getAllNotes: ${error.message}` });
  }
};

//get note by id
export const getNoteById = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorised access to this note" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `getNoteById: ${error.message}` });
  }
};

//update note
export const updateNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorised access to this note" });
    }
    const { title, content, deckId, isPinned } = req.body;

    if (title) note.title = title;
    if (content) note.content = content;
    if (deckId) note.deck = deckId;
    if (typeof isPinned === "boolean") note.isPinned = isPinned;

    const updatedNote = await note.save();
    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `updateNote: ${error.message}` });
  }
};

//delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorised access to this note" });
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `deleteNote: ${error.message}` });
  }
};
