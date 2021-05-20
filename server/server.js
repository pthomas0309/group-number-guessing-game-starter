const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// empty array to use later

//numbers randomly generated
// let answer = randomNumber(1,25);
// function randomNumber(min, max){
//   return Math.floor(Math.random() * (1 + max - min) + min);
// }
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// create a get route to retrieve data upon user request
app.get('/new-guesses', (req, res) => {
  // console.log to make sure that it is working
  console.log('Here are the /newGuesses');
  // send response back to client so that they can view the data that they are requesting
  res.send(newGuesses);
});

// create a get route to randomly generate a number
app.get('/random-answers', (req, res) => {
  //call the random number generator
  //log the random number
  console.log('Correct answer', answer);
  //send data to a client 
  res.send(String(answer));
});



//POST ROUTE FOR USER INPUT TO THE GAME 
app.post('/new-guesses', (req,res) => {
  //add incoming guesses
  console.log(req.body);
  newGuesses.push(req.body);
  //send good response
  res.sendStatus(201)
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});


