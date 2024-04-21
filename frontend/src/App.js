import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WordleGame from './WordleGame.js';
import HighScorePage from './HighScorePage.js';
import FormPage from './FormPage.js';
import { NavLink } from 'react-router-dom';

function App() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => setHighScores(data))
      .catch(error => console.error('Error fetching high scores:', error));
  }, []);
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Wordle Game</h1>
          <nav>
            <ul>
              <li><NavLink to="/">Game</NavLink></li>
              <li><NavLink to="/high-score">High Score</NavLink></li>
              <li><NavLink to="/form">Register</NavLink></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<WordleGame />} />
          <Route path="/high-score" element={<HighScorePage highScores={highScores} />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;