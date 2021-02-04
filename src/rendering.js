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
            let id = `${x}${y}`;
            const gridSquare = newElement(id, "grid-square", "div");
            GRID_CONTAINER_1.appendChild(gridSquare);
        }
    }
}

export function renderGrid(savePos, selectPos) {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let id = `${x}${y}`;
            let gridSquare = document.getElementById(id);
            gridSquare.classList.remove("ship", "overlap");
            if (savePos.includes(id) && selectPos.includes(id)) {
                gridSquare.classList.add("overlap");
            } else if (savePos.includes(id) || selectPos.includes(id)) {
                gridSquare.classList.add("ship");
            }
        }
    }
}

export function renderSelectedShip(shipPos) {
    ShipPos.forEach(pos => {});
}
