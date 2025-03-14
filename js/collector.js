const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const GAME_OVER_IMG_WIDTH = 960/2;
const GAME_OVER_IMG_HEIGHT = 800/2;
const GAME_OVER_IMG = new Image();
GAME_OVER_IMG.src = "./images/collector/GameOverMessage.png";
const BG_IMG = new Image();
BG_IMG.src = "./images/collector/bgImg2.png";


const PLAYER = {
    img: new Image(),
    x: 200,
    y: 200,
    width: 25,
    height: 45,
    enlarge: 2.5,
    face: {
        up: "images/collector/Yuki/up.png",
        down: "images/collector/Yuki/down.png",
        left: "images/collector/Yuki/left.png",
        right: "images/collector/Yuki/right.png"
    },
    speed: 5,
};

PLAYER.img.src = PLAYER.face["down"];

const KEYS = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowRight": false,
    "ArrowLeft": false,
    "r": false,
};

updateCanvasSize();
window.onresize = updateCanvasSize();

let gameOverImgX = CANVAS.width / 2 - GAME_OVER_IMG_WIDTH / 2;
let gameOverImgY = CANVAS.height / 2 - GAME_OVER_IMG_HEIGHT / 2;
let time = 20;
let gameOn = true;
let score = 0;
let userName = prompt("What's your name ?");

// let pokemon1 = new Figure(CTX, "./images/collector/pokemons/pokemon1.png", "pikachu", 0.3, 5);
// let pokemon2 = new Figure(CTX, "./images/collector/pokemons/pokemon2.png", "giglipah", 0.3, 5);
// let pokemon3 = new Figure(CTX, "./images/collector/pokemons/pokemon3.png", "balbazaur", 0.5, 5);
// let pokemonsGroup = [pokemon1, pokemon2, pokemon3];

let sweet1 = new Figure(CTX, "./images/fruitandveg/sweets1.png", "sweet1", 0.15, 2);
let sweet2 = new Figure(CTX, "./images/fruitandveg/sweets2.png", "sweet2", 0.15, 2);
let sweet3 = new Figure(CTX, "./images/fruitandveg/sweets3.png", "sweet3", 0.15, 2);
let sweet4 = new Figure(CTX, "./images/fruitandveg/sweets4.png", "sweet4", 0.15, 2);
let sweet5 = new Figure(CTX, "./images/fruitandveg/sweets5.png", "sweet5", 0.15, 2);
let sweetsGroup = [sweet1, sweet2, sweet3, sweet4, sweet5];

document.addEventListener('keydown', addKey);
document.addEventListener('keyup', removeKey);

// let bomb1 = new Figure(CTX, "./images/collector/bomb.png", "bomb1", 0.07, 1);
// let bomb2 = new Figure(CTX, "./images/collector/bomb.png", "bomb2", 0.1, 3);
// let bombsGroup = [bomb1, bomb2]

let veg1 = new Figure(CTX, "./images/fruitandveg/veg1.png", "veg1", 0.15, 2);
let veg2 = new Figure(CTX, "./images/fruitandveg/veg2.png", "veg2", 0.15, 2);
let veg3 = new Figure(CTX, "./images/fruitandveg/veg3.png", "veg3", 0.15, 2);
let veg4 = new Figure(CTX, "./images/fruitandveg/veg4.png", "veg4", 0.15, 2);
let vegGroup = [veg1, veg2, veg3, veg4];

function updateCanvasSize() {
    CANVAS.width = CANVAS.clientWidth;
    CANVAS.height = CANVAS.clientWidth * 0.5;
}

function writeText(text = "TEXT", color = "black", size = "30", font = "Fantasy", style = "", x = CANVAS.width / 2, y = CANVAS.height / 2) {
    CTX.font = style + " " + size + "px " + font;
    CTX.fillStyle = color;
    CTX.fillText(text, x, y);
}

function gameLoop() {
    if (gameOn == true){
        // CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        CTX.fillStyle = CTX.createPattern(BG_IMG, 'repeat');
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
        // CTX.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height);r
        writeText("Time: " + time, "#483c3c", 30, undefined, "bold", 950, 510);
        writeText("Hello " + userName, "#483c3c", 30, undefined, "bold", 900, 470);
        writeText("Health: " + score, "#483c3c", 30, undefined, "bold", 950, 550);
        drawFigure(PLAYER);
        controlPlayerMove();
        // for(let i = 0; i < pokemonsGroup.length; i++){
        //     pokemonsGroup[i].draw();
        //     pokemonsGroup[i].moveToRandomLoc();

        //     if(checkCollision(PLAYER, pokemonsGroup[i])){
        //         pokemonsGroup[i].jumpToRandomLoc();
        //         score++;
        //     }
        // }
        // for(let i = 0; i < bombsGroup.length; i++){
        //     bombsGroup[i].draw();
        //     bombsGroup[i].moveToRandomLoc();

        //     if(checkCollision(PLAYER, bombsGroup[i])){
        //         bombsGroup[i].jumpToRandomLoc();
        //         score--;
        //     }
        // }

        for(let i = 0; i < sweetsGroup.length; i++){
            sweetsGroup[i].draw();
            sweetsGroup[i].moveToRandomLoc();

            if(checkCollision(PLAYER, sweetsGroup[i])){
                sweetsGroup[i].jumpToRandomLoc();
                score -= 10;
            }
        }
        for(let i = 0; i < vegGroup.length; i++){
            vegGroup[i].draw();
            vegGroup[i].moveToRandomLoc();

            if(checkCollision(PLAYER, vegGroup[i])){
                vegGroup[i].jumpToRandomLoc();
                score++;
            }
        }    
        // requestAnimationFrame(gameLoop);  
    }
    if(KEYS["r"] == true){
        resetGame();
    }
    requestAnimationFrame(gameLoop); 
}
gameLoop();
setInterval(timer, 1000);
// setTimeout(timer, 1000);

function timer() {
    if(time > 0){
        time--;
    }
    else{
        gameOver();
    }
}

function gameOver() {
    gameOn = false;

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(GAME_OVER_IMG, gameOverImgX, gameOverImgY, GAME_OVER_IMG_WIDTH, GAME_OVER_IMG_HEIGHT);

    writeText(userName + ", your health is : " + score, "#483c3c", 30, undefined, "bold", GAME_OVER_IMG_WIDTH + 150, GAME_OVER_IMG_HEIGHT + 150);
    writeText("Press R to restart", "#483c3c", 30, undefined, "bold", GAME_OVER_IMG_WIDTH - 250, GAME_OVER_IMG_HEIGHT + 150);
}

function addKey(pEvent) {
    console.log(pEvent.key);
    KEYS[pEvent.key] = true;
}

function removeKey(pEvent) {
    KEYS[pEvent.key] = false;
    PLAYER.img.src = PLAYER.face["down"];
}

function controlPlayerMove() {
    if(KEYS["ArrowUp"] == true && PLAYER.y > 0){
        PLAYER.y = PLAYER.y - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["up"];
    }

    if(KEYS["ArrowLeft"] == true && PLAYER.x > 0){
        PLAYER.x = PLAYER.x - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["left"];
    }

    if(KEYS["ArrowDown"] == true && PLAYER.y < (CANVAS.height - PLAYER.height * PLAYER.enlarge)){
        PLAYER.y = PLAYER.y + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["down"];
    }

    if (KEYS["ArrowRight"] && PLAYER.x < (CANVAS.width - PLAYER.width * PLAYER.enlarge)) {
        PLAYER.x = PLAYER.x + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["right"];
    } 
}

function resetGame() {
    gameOn = true;
    time = 10;
    score = 0;
}