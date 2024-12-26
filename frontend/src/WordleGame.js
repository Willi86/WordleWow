import React, { useState, useEffect } from "react";
import "./styles/WordleGame.css";
import { useNavigate } from "react-router-dom";

function WordleGame() {
  const [wordLength, setWordLength] = useState(0);
  const [currentWord, setCurrentWord] = useState(""); // Store the word for testing
  const [userWord, setUserWord] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tries, setTries] = useState(0);
  const maxTries = 6; // Limit the number of attempts
  const [playerName, setPlayerName] = useState(""); // Player's name for high score submission
  const [startTime, setStartTime] = useState(Date.now()); // Track game start time
  const [isHighScoreSubmitted, setIsHighScoreSubmitted] = useState(false); // Track if high score is submitted
  const [feedbackMessage, setFeedbackMessage] = useState(""); // State for feedback messages

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch the random word and its length when the game starts
    fetch("http://localhost:5080/api/word")
      .then((response) => response.json())
      .then((data) => {
        setWordLength(data.wordLength);
        setCurrentWord(data.word); // Display the word for testing
        setStartTime(Date.now()); // Reset start time when a new game starts
      })
      .catch((err) => console.error("Error fetching word:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (userWord.trim().length !== wordLength) {
      setFeedbackMessage(`Your guess must be ${wordLength} letters long!`);
      return;
    }
  
    setFeedbackMessage(""); 
  
    fetch("http://localhost:5080/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userWord }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAttempts((prev) => [...prev, data.feedback]);
        setIsCorrect(data.isCorrect);
        setTries((prev) => prev + 1);
        setUserWord("");
      })
      .catch((err) => console.error("Error submitting guess:", err));
  };
  

  const handleHighScoreSubmit = (e) => {
    e.preventDefault();

    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate time taken

    fetch("http://localhost:5080/api/highscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
        wordLength,
        timeTaken,
        guesses: tries,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsHighScoreSubmitted(true); // Mark high score as submitted
        setPlayerName("");
      })
      .catch((err) => console.error("Error saving high score:", err));
  };

  const renderAttempts = () => {
    return attempts.map((attempt, index) => (
      <div key={index} className="wordle-attempts">
        {attempt.map((res, i) => (
          <div key={i} className={`square ${res.result}`}>
            {res.letter ? res.letter.toUpperCase() : ""}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="wordle-container">
      <h1 className="wordle-title">Wordle Game</h1>
      <div className="wordle-header">
        <strong>Test Mode:</strong>{" "}
        <span className="test-word">{currentWord}</span>
      </div>
      {isCorrect ? (
        <div className="success-message">
          <h2>Congratulations! You guessed the word in {tries} tries!</h2>
          {!isHighScoreSubmitted ? (
            <form onSubmit={handleHighScoreSubmit} className="high-score-form">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="high-score-input"
              />
              <button type="submit" className="high-score-button">
                Save High Score
              </button>
            
            </form>
          ) : (
            <p className="success-message">Your high score has been saved!</p>
          )}
        </div>
      ) : tries >= maxTries ? (
        <h2 className="game-over-message">
          Game Over! You've used all {maxTries} attempts.
        </h2>
      ) : (
        <>
          <p>Word Length: {wordLength}</p>
          {wordLength > 0 && (
            <form onSubmit={handleSubmit} className="wordle-form">
              <input
                type="text"
                maxLength={wordLength}
                value={userWord}
                onChange={(e) => setUserWord(e.target.value)}
                className="wordle-input"
              />
              <button type="submit" className="wordle-button">
                Submit
              </button>
            </form>
          )}
             {feedbackMessage && (
            <p className="feedback-message">{feedbackMessage}</p>
          )}
          <div>{renderAttempts()}</div>
         
        </>
      )}
       <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
    </div>
    
  );
}

export default WordleGame;
