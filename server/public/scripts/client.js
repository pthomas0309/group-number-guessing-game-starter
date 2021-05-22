$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  // handle the click button
  $( '#submitBtn' ).on('click', addGuess);
  $('#winningPlayer').on('click', '.reset', resetGame)
}

function resetGame(){
  $(this).closest('#winningPlayer').empty();
  $('#inputs').show();
  $('#guess').empty();
  $('#numGames').empty();
  $('#numGames').append('0');
  $.ajax({
    url: '/reroll-answer',
    method: 'GET'
  }).then(response => {
    console.log(response);
  })
}

function addGuess(){
  //gather input values
  let newRound={
    playerOne: {guess: $('#playerOneIn').val()},
    playerTwo:{guess: $('#playerTwoIn').val()},
    playerThree: { guess: $('#playerThreeIn').val()},
    playerFour: {guess: $('#playerFourIn').val()}
  }
  // add to array,  which is in the server.js files
  // push it to that array
  // make a post request with newGuess -> ajax
  $.ajax({
    url: '/new-guesses',
    method: 'POST',
    data: newRound
  }).then(response => {
    console.log(response); // testing for response values
    // this will be our response so we can see it later
    getRequest();
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
    //empty DOM
    $('#guess').empty();
    for(let round of response){
      if (round.playerOne.winner === true){
        $('#inputs').hide();
        $('#winningPlayer').append(`<h2>WINNER: PLAYER ONE</h2><h3>GUESS: ${round.playerOne.guess}</h3><button class="reset">RESET</button>`)
      } else if (round.playerTwo.winner === true){
        $('#inputs').hide();
        $('#winningPlayer').append(`<h2>WINNER: PLAYER TWO</h2><h3>GUESS: ${round.playerTwo.guess}</h3><button class="reset">RESET</button>`)
      } else if (round.playerThree.winner === true){
        $('#inputs').hide();
        $('#winningPlayer').append(`<h2>WINNER: PLAYER THREE</h2><h3>GUESS: ${round.playerThree.guess}</h3><button class="reset">RESET</button>`)
      } else if (round.playerFour.winner === true){
        $('#inputs').hide();
        $('#winningPlayer').append(`<h2>WINNER: PLAYER FOUR</h2><h3>GUESS: ${round.playerFour.guess}</h3><button class="reset">RESET</button>`)
      }
    // append guesses to the DOM of localhost:5000/new-guesses
    $('#guess').append(`
      <li>Player 1\'s guess: ${round.playerOne.guess} ${round.playerOne.tooHighOrTooLow}</li>
      <li>Player 2\'s guess: ${round.playerTwo.guess} ${round.playerTwo.tooHighOrTooLow}</li>
      <li>Player 3\'s guess: ${round.playerThree.guess} ${round.playerThree.tooHighOrTooLow}</li>
      <li>Player 4\'s guess: ${round.playerFour.guess} ${round.playerFour.tooHighOrTooLow}</li>
      `)
    }
    // Update DOM and show Game round numbers
    $('#numGames').text(`${response.length}`)
  }).catch(err =>{
    console.log('error in getRequest function');
  })
}
