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
    e.target.style.backgroundColor = 'black';
}

function clearSketch() {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(square => square.style.removeProperty('background-color'));
}

function toggleRainbowColors() {
    COLOR_MODE_BUTTON.textContent = (rainbowColors) ? 'Black and White' : 'Rainbow Colors';
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
let rainbowColors = true;
COLOR_MODE_BUTTON.addEventListener('click', toggleRainbowColors);