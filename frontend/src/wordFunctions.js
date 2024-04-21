//wordfunctions


import wordsData from './words.json';

async function getRandomWord() {
  try {
    console.log('Fetching words from JSON file...');
    const wordsArray = wordsData; // Assuming words.json contains an array of words

    console.log('Generating random word index...');
    const randomIndex = Math.floor(Math.random() * wordsArray.length);

    const randomWord = wordsArray[randomIndex];
    console.log('Random word:', randomWord);

    return randomWord;
  } catch (error) {
    console.error('Error fetching or parsing JSON file:', error);
    return null;
  }
}



// Example usage
getRandomWord().then(word => {
  console.log('Random word:', word);
});


  function checkWord(chosenWord, userWord) {
    const result = [];
    const lowercaseChosenWord = chosenWord.toLowerCase();
    const lowercaseUserWord = userWord.toLowerCase();
    const correctLetters = {};

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
  
    for (let i = 0; i < lowercaseUserWord.length; i++) {
        const letter = lowercaseUserWord[i];
        if (result[i].result === 'incorrect' && lowercaseChosenWord.includes(letter) && !correctLetters[letter]) {
            result[i].result = 'misplaced';
        }
    }
  
    return result;
  }
  
  export { checkWord, getRandomWord};
  