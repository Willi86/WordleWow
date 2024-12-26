import React, { useEffect, useState } from "react";
import "./styles/HighScorePage.css";

function HighScorePage() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5080/api/highscores")
      .then((response) => response.json())
      .then((data) => setHighScores(data))
      .catch((error) => console.error("Error fetching high scores:", error));
  }, []);

  return (
    <div className="high-score-container">
      <h1 className="high-score-title">High Scores</h1>
      <table className="high-score-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Word Length</th>
            <th>Time Taken (s)</th>
            <th>Guesses</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.wordLength}</td>
              <td>{score.timeTaken}</td>
              <td>{score.guesses}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="high-score-back-button">
        Back to Home
      </a>
    </div>
  );
}

export default HighScorePage;
