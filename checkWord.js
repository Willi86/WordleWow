const wordList = ["nothing", "David", "Tiger", "Chair", "Rabbet"];

export function getWordByIndex(index) { 
  return wordList[index - 1]; // This makes indexing start from 1, not 0
}

export function checkWord(chosenWord, userWord) {
  const result = [];
  const lowercaseChosenWord = chosenWord.toLowerCase();
  const lowercaseUserWord = userWord.toLowerCase();
  const correctLetters = {}; // Keep track of correctly guessed letters

  // Check correctness at each index
  for (let i = 0; i < lowercaseUserWord.length; i++) {
    const letter = lowercaseUserWord[i];
    const correctLetter = lowercaseChosenWord[i];

    if (letter === correctLetter) {
      result.push({ letter: letter, result: 'correct' });
      correctLetters[letter] = true;
    } else {
      result.push({ letter: letter, result: 'incorrect' });
    }
  }

  // Check for misplaced letters
  for (let i = 0; i < lowercaseUserWord.length; i++) {
    const letter = lowercaseUserWord[i];
    if (
      result[i].result === 'incorrect' &&
      lowercaseChosenWord.includes(letter) &&
      !correctLetters[letter]
    ) {
      result[i].result = 'misplaced';
    }
  }

  return result;
}
