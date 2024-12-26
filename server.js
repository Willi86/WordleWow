import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5080;

// MongoDB Setup
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// Middleware
app.use(cors());
app.use(express.json());
// Define the High Score schema and model
const highScoreSchema = new mongoose.Schema({
  name: String,
  wordLength: Number,
  timeTaken: Number,
  guesses: Number,
});
const HighScore = mongoose.model("HighScore", highScoreSchema);

app.post("/api/highscores", async (req, res) => {
  try {
    const { name, wordLength, timeTaken, guesses } = req.body;
    const newScore = new HighScore({ name, wordLength, timeTaken, guesses });
    await newScore.save();
    res.status(201).json({ message: "High score saved!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save high score" });
  }
});



// Load words from words.json
import { fileURLToPath } from "url";

// Fix for ES Modules on Windows
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to words.json
const wordsPath = path.resolve(__dirname, "data", "words.json");

let wordList = [];

try {
  const wordsData = fs.readFileSync(wordsPath, "utf-8");
  wordList = JSON.parse(wordsData);
  console.log("Words loaded successfully!");
} catch (err) {
  console.error("Failed to load words.json:", err);
}

// Current word for the game session
let currentWord = "";

// Generate and return a new random word
app.get("/api/word", (req, res) => {
  if (wordList.length === 0) {
    return res.status(500).json({ error: "No words available." });
  }
  const randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  res.json({ word: currentWord, wordLength: currentWord.length });
});

// High Score Routes
app.get("/api/highscores", async (req, res) => {
  try {
    const highScores = await HighScore.find().sort({ timeTaken: 1 });
    res.json(highScores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch high scores" });
  }
});

// Validate user guesses
app.post("/api/guess", (req, res) => {
  const { userWord } = req.body;

  // Validate input
  if (!userWord || userWord.trim().length !== currentWord.length) {
    return res.status(400).json({ error: "Invalid guess length." });
  }

  const feedback = [];
  const wordCounts = {};

  // Count occurrences of each letter in currentWord
  for (const letter of currentWord) {
    wordCounts[letter] = (wordCounts[letter] || 0) + 1;
  }

  // First pass: Check for correct letters in the correct positions
  for (let i = 0; i < userWord.length; i++) {
    if (userWord[i] === currentWord[i]) {
      feedback.push({ letter: userWord[i], result: "correct" });
      wordCounts[userWord[i]] -= 1;
    } else {
      feedback.push({ letter: userWord[i], result: "incorrect" });
    }
  }

  // Second pass: Check for misplaced letters
  for (let i = 0; i < userWord.length; i++) {
    if (
      feedback[i].result === "incorrect" &&
      currentWord.includes(userWord[i]) &&
      wordCounts[userWord[i]] > 0
    ) {
      feedback[i].result = "misplaced";
      wordCounts[userWord[i]] -= 1;
    }
  }

  const isCorrect = feedback.every((entry) => entry.result === "correct");

  res.json({ feedback, isCorrect });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
