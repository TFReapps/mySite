let score = 0;
let poppedYellow = 0;
let poppedRed = 0
let scoreBoard = document.getElementById("scoreBoard");
let restart = document.getElementById("restart");
let message = document.getElementById("balloonsGallery");

document.getElementById("gameInstructions").addEventListener('mousedown', gameInstructions);
document.addEventListener('mouseover', startGame);
restart.addEventListener('mousedown', restartGame);

function startGame(pEvent) {
    if(pEvent.target.className == "yellowBalloon"){
        pEvent.target.style.visibility = "hidden";
        score = score + 2;
        poppedYellow = poppedYellow + 1
        scoreBoard.textContent = score;
    }else if(pEvent.target.className == "redBalloon"){
        pEvent.target.style.visibility = "hidden";
        score = score - 5;
        poppedRed = poppedRed + 1
        scoreBoard.textContent = score;  
        // alert("You need to click on the yellow balloons");
    }
    endGame();
}

function restartGame() {
    // balloonImg.style.visibility = "visible";
    // score = 0
    // scoreBoard.textContent = score;
    location.reload();
}

function gameInstructions() {
    alert("Pop the balloons by clicking on them");
}

function endGame() {
    if (poppedYellow == 8) {
        message.textContent = "Well done ! You won";
        message.style.background = "green";
        // restartGame();
    }

    if (poppedRed == 4) {
        message.textContent = "Ouch ! You lost";
        message.style.background = "red";
    }
}