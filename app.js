//GAME RULES
//----------
//The user must enter a valid number between the range specified,
//They have 3 guesses to get it right
//else the game will finish and they will have to guess again after 3 seconds

window.onload = function() {
  let min = 1,
    max = 10,
    guessesLeft = 3,
    winningNum = getWinningNumber(),
    guess;

  const game = document.querySelector("game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    messageOut = document.querySelector(".message");

  const inputArray = [guessBtn, guessInput];

  function getWinningNumber() {
    return parseInt(Math.random() * max + min);
  }
  
  function toggleInputState() {
    inputArray.map(element => {
      element.disabled = !element.disabled;
    });
  }

  function setMessage(outputMessage, color) {
    messageOut.style.color = color;
    guessInput.style.borderColor = color;
    messageOut.textContent = outputMessage;
  }

  function reloadPage() {
    setMessage("Your game will be reset in 3 seconds", "purple");
    setTimeout(function() {
      guessesLeft = 3;
      toggleInputState();
      guessInput.value = "";
      setMessage("", "black");
      winningNum = getWinningNum();
    }, 3000);
  }

  function checkGameState() {
    guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess > max || guess < min) {
      setMessage(
        `Please enter a valid number between ${min} and ${max}`,
        "red"
      );
    } else {
      guessesLeft--;
      // A ? A : B
      // cond ? true : false
      if (guessesLeft === 0) {
        endGameStatus(
          `You have lost, the correct number was ${winningNum}`,
          "red"
        );
      } else if (guess === winningNum) {
        endGameStatus("Congratulations you won", "green");
      } else {
        setMessage(`Incorrect: You have ${guessesLeft} guesses left`, "red");
      }
    }
  }

  function endGameStatus(msg, color) {
    toggleInputState();
    setMessage(msg, color);
    setTimeout(reloadPage, 2000);
  }

  function initializeGame() {
    minNum.textContent = min;
    maxNum.textContent = max;
    guessBtn.addEventListener("click", checkGameState);
  }

  initializeGame();
};
