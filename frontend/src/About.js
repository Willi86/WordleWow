import React from "react";
import "./styles/AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Wordle Game</h1>
      <p className="about-text">
      Welcome to Wordle Wow!
      </p>

      <h2 className="about-section-title">Features</h2>
      <ul className="about-list">
        <li>You will be able to save your score to show off you have nothing to do but guessing words </li>
        <li>A very fun game that will make you shoot your self in the head</li>
      </ul>

      <h2 className="about-section-title">Technologies Used</h2>
      <p className="about-text">
        This project is built using the following technologies:
      </p>
      <ul className="about-list">
        <li>React for the frontend</li>
        <li>Node.js and Express for the backend</li>
        <li>MongoDB for storing high scores</li>
        <li>Basic CSS for styling</li>
      </ul>

      <h2 className="about-section-title">How to Play</h2>
      <p className="about-text">
        Guess the word by entering letters into the input field. Feedback will guide you:
      </p>
      <ul className="about-list">
        <li><strong>Green:</strong> Letter is correct and in the right position.</li>
        <li><strong>Yellow:</strong> Letter is correct but in the wrong position.</li>
        <li><strong>Red:</strong> Letter is incorrect.</li>
      </ul>

      <a href="/" className="about-back-button">
        Back to Home
      </a>
    </div>
  );
}

export default AboutPage;
