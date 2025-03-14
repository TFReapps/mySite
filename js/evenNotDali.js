let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let isDrawing = false;
let drawColor = "black";
let drawWidth = "2";
let restoreArray = [];
let index = -1;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);
window.addEventListener('onresize', saveData);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

fix_dpi();

updateCanvasSize();
// window.onresize = saveData;

function saveData() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    updateCanvasSize();
    ctx.putImageData(imgData, 0, 0);
}

function start(pEvent) {
    isDrawing = true;
    ctx.beginPath();
    // ctx.moveTo(pEvent.clientX, pEvent.clientY);

    if(pEvent.type == 'touchstart'){
        ctx.moveTo(pEvent.touches[0].clientX - canvas.getBoundingClientRect().left, 
            pEvent.touches[0].clientY - canvas.getBoundingClientRect().top);
    }
    else{
        ctx.moveTo(pEvent.clientX - canvas.getBoundingClientRect().left,
            pEvent.clientY - canvas.getBoundingClientRect().top);
    }
}

function draw(pEvent) {
    if(isDrawing){
        if(pEvent.type == 'touchmove'){
            ctx.lineTo(pEvent.touches[0].clientX - canvas.getBoundingClientRect().left, 
                pEvent.touches[0].clientY - canvas.getBoundingClientRect().top);
        }
        else{
            ctx.lineTo(pEvent.clientX - canvas.getBoundingClientRect().left, 
                pEvent.clientY - canvas.getBoundingClientRect().top)
        }
        ctx.strokeStyle = drawColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = drawWidth;
        ctx.stroke();
    }
}

function stopDraw(pEvent) {
    isDrawing = false;

    if(pEvent.type != 'mouseout'){
        restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index = index + 1;
    }
    
}

function updateCanvasSize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth * 0.5;
}

function changeColor(pElement) {
    drawColor = pElement.style.background;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    restoreArray = [];
    index = -1;
}


function saveImage() {
    let imageName = prompt("Please choose a name for your painting", "My paint")
    let dataUrl = canvas.toDataURL("image/png");
    console.log(dataUrl)
    let downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = imageName;
    downloadLink.click();
    downloadLink.delete;
}


function undoLast() {
    if(index <= 0){
        clearCanvas();
    }
    else{
        index = index - 1;
        restoreArray.pop();
        ctx.putImageData(restoreArray[index], 0, 0);
    }
}


// Extra things I added to my project
// When we hover on the color buttons, the border changes to white
let color_buttons = document.getElementsByClassName("color-fields")

document.addEventListener("mouseover", hoverIsOn);
document.addEventListener("mouseout", hoverIsOff);
document.addEventListener("mousedown", changeBorderColor);


function hoverIsOn(pEvent) {
    if (pEvent.target.style.border != "2px solid whitesmoke"){
        if (pEvent.target.className == "color-fields"){
            pEvent.target.style.border = "2px solid white";
            pEvent.target.style.transition = "0.2s"
        }   
    }
}

function hoverIsOff(pEvent) {
    if (pEvent.target.className == "color-fields"){
        if (pEvent.target.style.border != "2px solid whitesmoke"){
            pEvent.target.style.border = "2px solid black";
        } 
    }
}

function changeBorderColor(pEvent) {
    if (pEvent.target.className == "color-fields"){
        for (colour of color_buttons){
            colour.style.border = "2px solid black";
        } 
        pEvent.target.style.border = "2px solid whitesmoke";
    }
}

// fix_dpi();
// ctx.beginPath();
// ctx.lineWidth = "5";
// ctx.strokeStyle = "green";
// ctx.moveTo(50, 0);
// ctx.lineTo(50, canvas.height);
// ctx.stroke()

// ctx.beginPath();
// ctx.lineWidth = "5";
// ctx.strokeStyle = "purple";
// ctx.moveTo(0, 50);
// ctx.lineTo(canvas.width, 50);
// ctx.stroke()

// ctx.font = "100px Comic Sans MS";
// ctx.strokeStyle = "red";
// ctx.textAlign = "center";
// ctx.strokeText("Be Cool", canvas.width/2, canvas.height/2);

// ctx.strokeStyle = "red";
// ctx.strokeRect(canvas.width/2 -40, canvas.height/2 +100, 80, 80);