//HighScorePageContainer.js

import React, { useState, useEffect } from 'react';
import HighScorePage from './HighScorePage.js';

function ParentComponent() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Fetch high scores data from API or localStorage
    // For example:
    const fetchedHighScores = [
      { name: 'Alice', age: 25, attempts: 3, wordLength: 5 },
      { name: 'Bob', age: 30, attempts: 4, wordLength: 6 },
      // Other high scores...
    ];
    setHighScores(fetchedHighScores);
  }, []);

  return (
    <div>
      {/* Pass highScores array to the HighScorePage component */}
      <HighScorePage highScores={highScores} />
    </div>
  );
}

export default ParentComponent;
