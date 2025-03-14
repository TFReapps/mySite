let rockDiv = document.getElementById("rockDiv");
let paperDiv = document.getElementById("paperDiv");
let scissorsDiv = document.getElementById("scissorsDiv");
let spockDiv = document.getElementById("spockDiv");
let lizardDiv = document.getElementById("lizardDiv");
let userScoreSpan = document.getElementById("userScore");
let computerScoreSpan = document.getElementById("computerScore");
let messageDiv = document.getElementById("message");
let options = ['spock','rock', 'paper', 'scissors','lizard'];
let userScore = 0;
let computerScore = 0;
let gameRound = 0;

// rockDiv.addEventListener("mouseover", hoverIsOn);
// rockDiv.addEventListener("mouseout", hoverIsOff);
// paperDiv.addEventListener("mouseover", hoverIsOn);
// paperDiv.addEventListener("mouseout", hoverIsOff);
// scissorsDiv.addEventListener("mouseover", hoverIsOn);
// scissorsDiv.addEventListener("mouseout", hoverIsOff);

rockDiv.addEventListener('mousedown', function() {startGame('rock')});
paperDiv.addEventListener('mousedown', function() {startGame('paper')});
scissorsDiv.addEventListener('mousedown', function() {startGame('scissors')});
spockDiv.addEventListener('mousedown', function() {startGame('spock')});
lizardDiv.addEventListener('mousedown', function() {startGame('lizard')});

document.addEventListener("mouseover", hoverIsOn);
document.addEventListener("mouseout", hoverIsOff);

function hoverIsOn(pEvent) {
    if (pEvent.target.className == "rps"){
        pEvent.target.style.backgroundColor= "#177e89" ;
        pEvent.target.style.transition = "0.2s"
        pEvent.target.style.cursor = "pointer";
        // pEvent.target.style.border = "12px solid rgb(227, 255, 71)";
    }
}

function hoverIsOff(pEvent) {
    if (pEvent.target.className == "rps"){
        pEvent.target.style.backgroundColor='transparent';
        // pEvent.target.style.border = "20px solid rgb(0, 72, 255)"
    }
}

function startGame(pUserSelection) {
    let userChoice = pUserSelection;
    console.log("User:" + userChoice);

    let randomNumber = Math.floor(Math.random() * 5);
    console.log("Random Number: " + randomNumber);

    let computerChoice = options[randomNumber];
    console.log("Computer: " + computerChoice);
    rockPaperScissors(userChoice, computerChoice);
}

function rockPaperScissors(puserChoice, pcomputerchoice) {
    let result = puserChoice + pcomputerchoice;

    if (gameRound == 13){
        if(userScore > computerScore){
            messageDiv.textContent = "You won. Congratulations";
            messageDiv.style.color = "#084c61";
        }
        if(userScore < computerScore){
            messageDiv.textContent = "Oh no. You lost";
            messageDiv.style.color = "#db3a34";
        }
    }
    else{
        if (result == 'rockrock' || result == 'paperpaper' || result =='scissorsscissors' || result =='lizardlizard' || result =='spockspock'){
            console.log("It's a draw");
            messageDiv.textContent = "It's a draw. Try again";
            messageDiv.style.color = "#323031";
        }
        
        if (result == 'rockscissors' || result =='scissorspaper' || result =='paperrock' || result =='rocklizard' || result =='lizardspock' || result =='spockscissors' || result =='scissorslizard' || result =='lizardpaper' || result =='paperspock' || result =='spockrock'){
            console.log("You Won");
        
            userScore = userScore + 1;
            userScoreSpan.textContent = userScore;
            messageDiv.textContent = "";
            // messageDiv.style.color = "#177e89";
            gameRound = gameRound + 1;
        }

        if (result == 'scissorsrock' || result =='rockspock' || result =='spockpaper' || result =='paperlizard' || result =='lizardscissors' || result =='scissorsspock' || result =='spocklizard' || result =='lizardrock' || result =='rockpaper' || result =='paperscissors'){
            console.log("You lost");
        
            computerScore = computerScore + 1;
            computerScoreSpan.textContent = computerScore;
            messageDiv.textContent = "";
            // messageDiv.style.color = "#db3a34";
            gameRound = gameRound + 1;
        }
    }
}
