const SKETCHPAD = document.querySelector('.sketchpad');
const CHANGE_GRID_BUTTON = document.querySelector('#change-grid');
const RESET_BUTTON = document.querySelector('#reset');
const COLOR_MODE_BUTTON = document.querySelector('#set-colors');

function createGrid(size = 16) {
    clearGrid();
    accomodateGrid(size);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addSquare();
        }
    }
}

function addSquare() {
    const square = document.createElement('div');
    SKETCHPAD.appendChild(square);
}

// Sets expected amount of columns in CSS grid
function accomodateGrid(cols) {
    SKETCHPAD.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function clearGrid() {
    SKETCHPAD.innerHTML = '';
}

function setDivsColorable(e) {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(elem => elem.addEventListener('mouseenter', colorSquare));
}

function setDivsNotColorable() {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(elem => elem.removeEventListener('mouseenter', colorSquare));
}

function colorSquare(e) {
    const style = e.target.style;
    if (rainbowColors) {
        if (!style.backgroundColor) {
            style.backgroundColor = getRandomColor();
        } else {
            style.backgroundColor = getDarkerColor(style.backgroundColor);
        }
    } else {
        style.backgroundColor = 'black';
    }
}

function getRandomColor() {
    return getRGBString(randInt(255), randInt(255), randInt(255));
}

// Decreasing all RGB values by 10% with every pass to darken. 
// Could also lower opacity with every pass to get complete black within 10 passes.
function getDarkerColor(originalRGB) {
    rgbValues = getRGBValues(originalRGB);
    rgbValues = rgbValues.map(value => Math.floor(value * .9));     // Decreases all RGB values by 10%
    return getRGBString(...rgbValues);
}

function getRGBString(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`
}

function randInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRGBValues(rgb) {
    let rgbValues = rgb.replace(/[^\d,]/g, '').split(',');
    return rgbValues.map(Number);
}

function clearSketch() {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(square => square.style.removeProperty('background-color'));
}

function toggleRainbowColors() {
    clearSketch();
    COLOR_MODE_BUTTON.textContent = (rainbowColors) ? 'Rainbow off' : 'Rainbow on';
    rainbowColors = !rainbowColors;
}

// Creates the default 16x16 grid
createGrid();

// Colors grid when mouse held down until mouse click is released
SKETCHPAD.addEventListener('mousedown', setDivsColorable);
SKETCHPAD.addEventListener('mouseup', setDivsNotColorable);

// Color square that was initially clicked
SKETCHPAD.addEventListener('mousedown', colorSquare);   

CHANGE_GRID_BUTTON.addEventListener('click', () => {
    createGrid(prompt('Set size of grid? (Clears sketch)'));
});
RESET_BUTTON.addEventListener('click', clearSketch);

// Variable controls whether a random colors are used while sketching or black and white. Toggled with a button.
let rainbowColors = false;
COLOR_MODE_BUTTON.addEventListener('click', toggleRainbowColors);