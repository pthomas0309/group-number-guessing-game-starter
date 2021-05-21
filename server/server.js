const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

const randomNumber = require("./modules/randomNumber.js");
const guessesArray = require("./modules/guesses.js");
const randomChecking = require("./modules/randomChecking.js");
let answer = randomNumber(1, 25);
//numbers randomly generated
// let answer = randomNumber(1,25);
// function randomNumber(min, max){
//   return Math.floor(Math.random() * (1 + max - min) + min);
// }
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// create a get route to retrieve data upon user request
app.get('/new-guesses', (req, res) => {
  // console.log to make sure that it is working
  console.log('Here are the /newGuesses');
  // send response back to client so that they can view the data that they are requesting
  res.send(guessesArray);
});

// create a get route to tell if each player's guess was too high or too low compared to the random number
app.get('/random-answers', (req, res) => {
  //call the random number generator
  //log the random number
  console.log('Correct answer', answer);
  //send data to a client 
  res.send(String(answer));
});

//route to host data checking
app.get('/answer-eval', (req, res) => {
  //call the answer checking function
  console.log(randomChecking());
  //send back the winner
  res.send(randomChecking())
})

//POST ROUTE FOR USER INPUT TO THE GAME 
app.post('/new-guesses', (req,res) => {
  const guess = (req.body)
  //add incoming guesses
  guessesArray.push(guess);
  //send good response
  res.sendStatus(201)
});

app.listen(PORT, () => {
  // finding out our random number
  console.log(randomNumber(1, 25));
  console.log ('Server is running on port', PORT)
});


