import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import WordleGame from "./WordleGame";
import HighScorePage from "./HighScorePage";
import AboutPage from "./About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<WordleGame />} />
        <Route path="/highscores" element={<HighScorePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
