$(document).ready(handleReady);

let randomCheckArray = [];
let guessesArray = [];

function handleReady() {
  console.log("jquery is loaded!")
  // handle the click button
  $( '#submitBtn' ).on('click', addGuess);
}

function addGuess(){
  //gather input values
  let newGuess={
    playerOne: $('#playerOneIn').val(),
    playerTwo: $('#playerTwoIn').val(),
    playerThree: $('#playerThreeIn').val(),
    playerFour: $('#playerFourIn').val()
  }
  // add to array,  which is in the server.js files
  // push it to that array
  // make a post request with newGuess -> ajax
  $.ajax({
    url: '/new-guesses',
    method: 'POST',
    data: newGuess
  }).then(function (response) => {
    console.log(response); // testing for response values
    // this will be our response so we can see it later
    guessesArray = response;
    getRequest();
    randomCheck();
  }).catch(err => {
    console.log('error in addGuess function')
  })

  //empty inputs
  $('#playerOneIn').val(''),
  $('#playerTwoIn').val(''),
  $('#playerThreeIn').val(''),
  $('#playerFourIn').val('')
} // end function addGuess


// GET Route for displaying info to DOM
function getRequest(){
  console.log('in getRequest function')
  // go to server route /guesses
  $.ajax({
    method: 'GET',
    url: '/new-guesses'
  }).then(function (response){
    console.log(response);
    guessesArray = response;
    //empty DOM
    $('#guess').empty();
  // append guesses to the DOM of localhost:5000/new-guesses
  for (let guess of response){
    $('#guess').append(`
      <li>Player 1\'s guess: ${guess.playerOne}</li>
      <li>Player 2\'s guess: ${guess.playerTwo}</li>
      <li>Player 3\'s guess: ${guess.playerThree}</li>
      <li>Player 4\'s guess: ${guess.playerFour}</li>
      `)
    }
    // Update DOM and show Game round numbers
    $('#numGames').text(`${response.length}`)
  }).catch(err =>{
    console.log('error in getRequest function');
  })
}

function randomCheck(){
  $.ajax({
    method: 'GET',
    url: '/answer-eval'
  }).then(function(response) => {
    randomCheckArray = response
    console.log(randomCheckArray)
  }).catch(err => {
    console.log('error in randomCheck function')
  })

}