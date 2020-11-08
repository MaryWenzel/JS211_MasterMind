'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let hint;


const printBoard = (guess) =>  {
  board.push(`Guess is ${guess} and hint is ${hint}`)
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// secret code 
const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let guessArray = guess.split('');
  let solutionArray = solution.split('');
  let correctLetterLocations = 0;
  for (let i = 0; i < solutionArray.length; i++){
    if (guessArray[i] == solutionArray[i]){
      correctLetterLocations++
      solutionArray[i] = null
    }
  }
  let correctLetters = 0;
      for (let x = 0; x < solutionArray.length; x++) {
        let targetIndex = solutionArray.indexOf(guessArray[x])
        console.log(targetIndex)
        console.log(guessArray)
        if (targetIndex > -1) {
          correctLetters++
          solutionArray[targetIndex] = null
        }
      }
  return `You have ${correctLetterLocations} in the correct location and ${correctLetters} correct letters`
}

const mastermind = (guess) => {
  solution = ''; // Comment this out to generate a random solution
  // your code here
  if (guess === solution){
    return 'You guessed it!'
  }
  hint = generateHint(guess)
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard(guess);
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}