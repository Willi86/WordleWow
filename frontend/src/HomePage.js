import React from "react";
import "./styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Wordle Game</h1>
      <p className="home-text">
        Test your word-guessing skills with this Wordle-inspired game! Start a new game, check the high scores, or
        learn more about how it works.
      </p>
      <a href="/game" className="home-button">
        Start Game
      </a>
      <a href="/highscores" className="home-button">
        View High Scores
      </a>
      <a href="/about" className="home-button">
        Learn More
      </a>
    </div>
  );
}

export default HomePage;
