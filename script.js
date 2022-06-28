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

function accomodateGrid(cols) {
    SKETCHPAD.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function clearGrid() {
    SKETCHPAD.innerHTML = '';
}

// Creates the default 16x16 grid
createGrid();