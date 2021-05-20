$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  // handle the click button
  $( '#submitBtn' ).on('click', addGuess);
  // get request
  getRequest();
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
  }).then(response => {
    console.log(response); // testing for response values
    getRequest();
  }) // end .then function

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
  })
}