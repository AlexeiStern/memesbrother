'use strict'
var gCanvas;
var gCtx;
var gFocusedLine = 50;
var gCurrMemes = {
    upper: '',
    middle: '',
    lower: ''
};
var gMeme;
var gFontSize = 40;
var gAlign = 'center';
var gFont = 'Impact';
var gColor = '#FFFFFF'

function init() {
    var elMemes = document.querySelector(".memes");
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    var strHTMLs = '';
    for (var i = 1; i < 19; i++) {
        strHTMLs += `<img src="./meme-imgs (square)/${i}.jpg" onclick="imgSelected(this)">`;
    }
    elMemes.innerHTML = strHTMLs;

}

function imgSelected(img) {
    gCurrMemes.image = img;
    let elMeme= document.querySelector('.meme-editor');
    elMeme.style.display= 'block';
    window.scrollTo(0, 0);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

}

function renderCanvas() {
    gCtx.clearRect(0, 0, 500, 500);
    gCtx.drawImage(gCurrMemes.image, 0, 0, gCanvas.width, gCanvas.height);
    drawText(gCurrMemes.upper, 250, 50, gFont, gFontSize, gColor);
    drawText(gCurrMemes.middle, 250, 250, gFont, gFontSize, gColor);
    drawText(gCurrMemes.lower, 250, 450, gFont, gFontSize, gColor);

}

function drawText(text, x, y, font, size, color) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = size + 'px ' + font;
    gCtx.textAlign = gAlign;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

window.onkeyup = keyup;
function keyup(ev) {
    // {if (ev.target.value==='add your meme here...')
    var currMeme = ev.target.value;
    switch (gFocusedLine) {
        case 50: gCurrMemes.upper = currMeme; break;
        case 250: gCurrMemes.middle = currMeme; break;
        case 450: gCurrMemes.lower = currMeme; break;
    }
    renderCanvas()
}

function switchText() {
    var tempMeme = gCurrMemes.upper;
    gCurrMemes.upper = gCurrMemes.lower;
    gCurrMemes.lower = tempMeme;
    renderCanvas();
}

function changeUp() {
    if (gFocusedLine < 450) {
        gFocusedLine += 200;
        var elLine= document.querySelector('.grid-child-line');
        elLine.style.marginTop=gFocusedLine-50+'px';
    }
}

function changeDown() {
    if (gFocusedLine > 50){
    gFocusedLine -= 200;
    var elLine= document.querySelector('.grid-child-line');
    elLine.style.marginTop=gFocusedLine-50+'px';
    }
}

function addSize() {
    if (gFontSize < 80) gFontSize += 5;
    renderCanvas();
}

function deSize() {
    if (gFontSize > 0) gFontSize -= 5;
    renderCanvas();
}

function rmvLine() {
    switch (gFocusedLine) {
        case 50: gCurrMemes.upper = ''; break;
        case 250: gCurrMemes.middle = ''; break;
        case 450: gCurrMemes.lower = ''; break;
    }
    renderCanvas();
}

function changeFont(font) {
    gFont = font.value;
    renderCanvas();
}

function changeAlign(align) {
    gAlign = align.value;
    renderCanvas();
}

function downloadMeme() {
    var image = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
}

function saveToStorage(){
    localStorage.setItem("savedMeme",gCanvas.toDataURL());
}

function loadFromStorage(){
var img = new Image();
var dataURL = localStorage.getItem("savedMeme")
img.src= dataURL;
console.log(img)
}

function changeColor(selCol){
gColor=selCol.value;
renderCanvas();

}