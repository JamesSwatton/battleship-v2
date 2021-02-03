import {
    GRID_SIZE,
    GRID_CONTAINER_1,
    GRID_CONTAINER_2,
    SHIP_SELECT_CONTAINER
} from "./constants.js";

import { newElement } from "./helpers/newElement.js";

export function createGrid() {
    GRID_CONTAINER_1.innerHTML = "";
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let id = `${x}-${y}`;
            const gridSquare = newElement(id, "grid-square", "div");
            GRID_CONTAINER_1.appendChild(gridSquare);
        }
    }
}

export function renderGrid(saveGrid, selectGrid) {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let gridSquare = document.getElementById(`${x}-${y}`);
            gridSquare.classList.remove("ship", "overlap");
            if (saveGrid[y][x] !== 0 && selectGrid[y][x] !== 0) {
                gridSquare.classList.add("overlap");
            } else if (saveGrid[y][x] !== 0 || selectGrid[y][x] !== 0) {
                gridSquare.classList.add("ship");
            }
        }
    }
}

export function renderSelectedShip(shipPos) {
    ShipPos.forEach(pos => {});
}
