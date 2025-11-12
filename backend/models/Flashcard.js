import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);
export default Flashcard;
