// Refer to the online book to access detailed instructions for this project.
const input = require('readline-sync');
// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/scrabble-scorer.html

// Code your transform function here:
function transform(obj) {
    let retObj = {};
    for (key in obj) {
        let arr = obj[key];
        for (let i = 0; i < arr.length; i++) {
            retObj[arr[i].toLowerCase()] = Number(key);
        }
    }
    return retObj;
}


// Code your initialPrompt function here:
function initialPrompt() {
let info = input.question(`
Welcome to the Scrabble score calculator!

Which scoring algorithm would you like to use?

0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.

Enter 0, 1, or 2:`);
if(info === '0' | info === '1' | info === '2') {
  return info;
} else {
   console.log(`Please enter a valid input`)
   initialPrompt();
  }
}

// Code your runProgram function here:
function runProgram(arr){
  let selection = initialPrompt();
  getWord();
  
  function getWord() {
  word = input.question(`Please enter a word, or 'Stop' to end program.`)
  
  if(/^[a-z ]+$/.test(word.toLowerCase()) !== true){
    console.log(`Invalid word.`);
    getWord();
  }
  
  if(word === 'Stop') {
    console.clear();
    runProgram(scoringAlgorithms);
  } else  {
     if(Number(selection) === 1){
         console.log(`Your score is: ${arr[1].scoreFunction(word)}`);
      }   else if(Number(selection) === 2){
           console.log(`Your score is ${arr[2].scoreFunction(word)}`);
          }     else {
                   console.log(`Your score is: ${arr[0].scoreFunction(word, newPointStructure)}`);
                }
    getWord()
    }
  }
}



// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// Use the transform function to create the newPointStructure object here:
const newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

// Create your scoringAlgorithms array here:
function scrabble(word, obj){
let score = 0;
for (let i = 0; i < word.length; i++){
  for(key in obj){
    if (word[i].toLowerCase() === key) {
      score = score + Number(obj[key]);
    }
  }
}
return score;
}

function simpleScore(word){
 let score = word.length;
 return score;
};

function bonusVowels(word){
let score = 0;
for (let i = 0; i < word.length; i++){
  if (/[aeiou]/.test(word[i].toLowerCase()) === true){
    score = score + 3;
  } else {
     score++
    }
}
return score;
}

const scrabbleObj = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm',
  scoreFunction: scrabble
}
const simpleScoreObj = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: simpleScore
}
const bonusVowelsObj = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: bonusVowels
}

scoringAlgorithms = [scrabbleObj, simpleScoreObj, bonusVowelsObj];
// Call the runProgram function here:
runProgram(scoringAlgorithms);


