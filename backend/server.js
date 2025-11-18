import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import deckRouter from "./routes/deck.js";
import flashcardRouter from "./routes/flashcard.js";
import noteRouter from "./routes/note.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/decks", deckRouter);
app.use("/api/flashcards", flashcardRouter);
app.use("/api/notes", noteRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, StudyFlow API is running!");
});
