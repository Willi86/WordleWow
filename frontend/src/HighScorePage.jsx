// HighScorePage.js
import React from 'react';

function HighScorePage({ highScores }) {
  return (
    <div className="high-score-container">
      <h2>High Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Attempts</th>
            <th>Word Length</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.age}</td>
              {/* Assuming attempts and wordLength are properties of each score object */}
              <td>{score.attempts}</td>
              <td>{score.wordLength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScorePage;
