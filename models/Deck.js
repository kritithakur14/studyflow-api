import mongoose from "mongoose";

const deckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Virtual populate for flashcards
deckSchema.virtual("flashcards", {
  ref: "Flashcard",
  localField: "_id",
  foreignField: "deck",
});

//virtual for notes
deckSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "deck",
});

deckSchema.set("toObject", { virtuals: true });
deckSchema.set("toJSON", { virtuals: true });

const Deck = mongoose.model("Deck", deckSchema);
export default Deck;
