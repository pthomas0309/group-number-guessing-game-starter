const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};
let answer = 0;
console.log(decideAnswer());
function decideAnswer(){
  let number = randomNumber(1, 25)
  answer += number;
  return answer;
}

const guessesArray = [];

function checkGuesses(){
  for (round of guessesArray){
    if (tooHigh(round.playerOne.guess)){
      round.playerOne.tooHighOrTooLow = 'Too High';
    } else if (tooLow(round.playerOne.guess)){
      round.playerOne.tooHighOrTooLow = 'Too Low';
    } else {
      round.playerOne.tooHighOrTooLow = 'On the money';
      round.playerOne.winner = true;
    }
    if (tooHigh(round.playerTwo.guess)){
      round.playerTwo.tooHighOrTooLow = 'Too High';
    } else if (tooLow(round.playerTwo.guess)){
      round.playerTwo.tooHighOrTooLow = 'Too Low';
    } else {
      round.playerTwo.tooHighOrTooLow = 'On The Money';
      round.playerTwo.winner = true;
    }
    if (tooHigh(round.playerThree.guess)){
      round.playerThree.tooHighOrTooLow = 'Too High';
    } else if (tooLow(round.playerThree.guess)){
      round.playerThree.tooHighOrTooLow = 'Too Low';
    } else {
      round.playerThree.tooHighOrTooLow = 'On The Money'
      round.playerThree.winner = true;
    }
    if (tooHigh(round.playerFour.guess)){
      round.playerFour.tooHighOrTooLow = 'Too High';
    } else if (tooLow(round.playerFour.guess)){
      round.playerFour.tooHighOrTooLow = 'Too Low';
    } else {
      round.playerFour.tooHighOrTooLow = 'On The Money'
      round.playerFour.winner = true;
    }
  }
}

function tooHigh(playerGuess){
  console.log(answer);
  return playerGuess > answer;
}

function tooLow(playerGuess){
  console.log(answer);
  return playerGuess < answer;
}

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// create a get route to retrieve data upon user request
app.get('/new-guesses', (req, res) => {
  // console.log to make sure that it is working
  console.log('Here are the /newGuesses');
  checkGuesses()
  // send response back to client so that they can view the data that they are requesting
  res.send(guessesArray);
});

// create a get route to tell if each player's guess was too high or too low compared to the random number
app.get('/reroll-answer', (req, res) => {
  //call the random number generator
  //log the random number
  answer = 0;
  console.log(decideAnswer());
  guessesArray.length = 0;
  console.log(guessesArray);
  //send data to a client 
  res.send('answer re-rolled');
});

//POST ROUTE FOR USER INPUT TO THE GAME 
app.post('/new-guesses', (req,res) => {
  const guess = (req.body)
  //add incoming guesses
  guessesArray.push(guess);
  //send good response
  res.sendStatus(201)
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});


