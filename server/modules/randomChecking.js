// this pulls from our empty guesses array
const newGuessesArray = require("./modules/guesses.js");
console.log(newGuessesArray);
// this pulls from our randomNumber function
const randomNumber = require("./modules/randomNumber.js");
console.log(randomNumber);
// will need access to the newGuesses array (create it's own file?)
module.exports = () => {
    console.log('in random checking');
    // this is an empty object, which will allow us to find out if each player's guess was too high or too low compared to the random number
    const tooHighOrTooLow = {};
    // this is an empty array, which will hold the results of if it was too high or too low
    const tooHighOrTooLowArray = [];
    // this part loop will go through our newGuessesArray, compare it to our random number, and declare a winner.
    for (let taco of newGuessesArray){
        let winner = "";
        if (taco.playerOne == randomNumber){
            winner = "Player One";
            return winner;
        } else if (taco.playerTwo == randomNumber){
            winner = "Player Two";
            return winner;
        } else if (taco.playerThree == randomNumber){
            winner = "Player Three";
            return winner
        } else if (taco.playerFour == randomNumber){
            winner = "Player Four";
            return winner
        }
    // this part will loop through our newGuessesArray, compare it to our random number, and find out if each player's guess was too high or too low.
        if (taco.playerOne > randomNumber){
            tooHighOrTooLow.playerOne = true;
        } else if (taco.playerTwo > randomNumber){
            tooHighOrTooLow.playerTwo = true;
        } else if (taco.playerThree > randomNumber){
            tooHighOrTooLow.playerThree = true;
        } else if (taco.playerFour > randomNumber){
            tooHighOrTooLow.playerFour = true;
        }
        tooHighOrTooLowArray.push(tooHighOrTooLow)
    } // end for loop
    return tooHighOrTooLowArray;
}
// will need to access this later

// functionality to return "Player Three" && [{array of booleans if the players guess is higher than randomNumber}]
