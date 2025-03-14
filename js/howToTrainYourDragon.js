let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let animationsLabel = document.getElementById("animationOptions");
// let dropdown = document.getElementById("animations");
// dropdown.addEventListener('change', setState);

const CANVAS_WIDTH = canvas.width = 1500;
const CANVAS_HEIGHT = canvas.height = 750;
const SPRITE_WIDTH = 680;
const SPRITE_HEIGHT = 475;
const SPRITE_FRAMES = {
    "idle": {frames: 10},
    "jump": {frames: 12},
    "run": {frames: 8, soundSrc: "./sounds/dragonBreathingRunning.mp3"},
    "sleep": {frames: 8, soundSrc: "./sounds/dragonSleep.mp3"},
    "walk": {frames: 10},
    "Other": {frames: 13},
    "Bird": {frames: 39},
}

let playerState = "idle";
let frame = 1;
let playerSprite = "dragon";


let playerImage = new Image();
let sound = new Audio();

function setSprite(pEvent) {
    playerSprite = pEvent.target.value;
    if(playerSprite != "dragon"){
        if(playerSprite == "bird"){
            playerState = "Bird";
        }
        else{
            playerState = "Other";
        }
        animationsLabel.hidden = true;
    }
    else{
        playerState = "idle";
        animationsLabel.hidden = false;
    }
}


function setState(pEvent) {
    playerState = pEvent.target.value;
    sound.pause();
    sound.src = SPRITE_FRAMES[playerState].soundSrc;
    sound.loop = true;
    sound.play();
}


function animate() {
    let numOfFrames = SPRITE_FRAMES[playerState].frames;
    playerImage.src = "images/sprites/" + playerSprite + playerState + frame + ".png";
    playerImage.onload = () =>{
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(playerImage, (canvas.width * 0.3), 200, SPRITE_WIDTH, SPRITE_HEIGHT);
        // This rule allows to check for two situations for which the background will start to slide for a sense of movement
        if (playerState == "run" || playerState == "walk" || playerState == "Other" || playerState == "Bird"){
            canvas.style.animation = 'slide 5s infinite linear';
        }
        else{
            canvas.style.animation = 'fixed';
        }

        if(frame < numOfFrames){
            frame++;
        }
        else{
            frame = 1;
        }
    }
    setTimeout(function() {requestAnimationFrame(animate);}, 75)
}

animate();

