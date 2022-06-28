const SKETCHPAD = document.querySelector('.sketchpad');

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

function setDivsColorable() {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(elem => elem.addEventListener('mouseenter', dragAndColor));
}

function setDivsNotColorable() {
    const sketchSquares = document.querySelectorAll('.sketchpad>div');
    sketchSquares.forEach(elem => elem.removeEventListener('mouseenter', dragAndColor));
}

function dragAndColor() {
    console.log('color');
}

// Creates the default 16x16 grid
createGrid();

SKETCHPAD.addEventListener('mousedown', setDivsColorable);
SKETCHPAD.addEventListener('mouseup', setDivsNotColorable);