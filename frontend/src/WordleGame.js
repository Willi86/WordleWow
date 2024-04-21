//wordleGame.js
import React, { useState, useEffect } from 'react';
import { checkWord, getRandomWord } from './wordFunctions.js';
import './App.css';


function Square({ result, letter }) {
  let color;
  if (result === 'correct') {
    color = 'green';
  } else if (result === 'incorrect') {
    color = 'red';
  } else if (result === 'misplaced') {
    color = 'yellow';
  }

  return (
    <div style={{ width: '50px', height: '50px', backgroundColor: color, margin: '5px', display: 'inline-block' }}>
      {letter.toUpperCase()}
    </div>
  );
}

function WordleGame() {
  const [userWord, setUserWord] = useState('');
  const [result, setResult] = useState([]);
  const [randomWord, setRandomWord] = useState('');
  const [tries, setTries] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Fetch a random word when the component mounts
    async function fetchRandomWord() {
      try {
        console.log('Fetching a random word...');
        const word = await getRandomWord();
        setRandomWord(word);
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    }
    fetchRandomWord();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if userWord is empty
  if (!userWord.trim()) {
    // If userWord is empty, return early
    return;
  }
    try {
      console.log('Checking the word...');
      const wordCheckResult = checkWord(randomWord, userWord); // Check the user's input against the random word
      setResult(wordCheckResult); // Set the result
      setTries(tries + 1); // Increment the number of tries
  
      // Check if all letters are correct
      const isAllCorrect = wordCheckResult.every((res) => res.result === 'correct');
      if (isAllCorrect) {
        setShowMessage(true); // Show the message only when all letters are correct
      } else {
        setShowMessage(false); // Hide the message otherwise
      }
    } catch (error) {
      console.error('Error checking word:', error);
    }
  };
  

  const handleInputChange = (e) => {
    // Limit input to 5 characters
    setUserWord(e.target.value/*.slice(0, 5)*/);
  };

  const handleNewWordClick = async () => {
    try {
      setShowMessage(false); // Hide the message
      setResult([]); // Clear the result
      setUserWord(''); // Clear the user's input
      setTries(0); // Reset the number of tries
      const word = await getRandomWord(); // Fetch a new random word
      setRandomWord(word);
    } catch (error) {
      console.error('Error fetching new word:', error);
    }
  };

  return (
    <div className='wordle-container'>
        <p>{`Number of letters: ${randomWord.length}`}</p>

        <form className="wordle-form" onSubmit={handleSubmit}>
    <input className="wordle-input" type="text" value={userWord} onChange={handleInputChange} maxLength={randomWord.length} />
    <button className="wordle-button" type="submit">Submit</button>
  </form>
  <div className="wordle-result">
    {result.map((res, index) => (
      <Square key={index} result={res.result} letter={res.letter} />
    ))}
  </div>
  {showMessage && (
    <div className="wordle-message">
      <p>{`You guessed the word in ${tries} tries`}</p>
      <button className="wordle-new-word-button" onClick={handleNewWordClick}>Get New Word</button>
    </div>
      )}
    </div>
  );
}

export default WordleGame;
