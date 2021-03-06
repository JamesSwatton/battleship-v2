import {
    GRID_SIZE,
    GRID_CONTAINER_1,
    GRID_CONTAINER_2,
    SHIP_SELECT_CONTAINER
} from "./constants.js";

import { newElement } from "./helpers/newElement.js";

export function renderGrid(grid) {
    console.log("hello");
    GRID_CONTAINER_1.innerHTML = "";
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let id = `${x}-${y}`;
            const gridSquare = document.createElement("div");
            gridSquare.id = id;
            gridSquare.classList.add("grid-square");
            console.log(gridSquare);
            if (grid[y][x] !== 0) {
                console.log("in");
                if (grid[y][x] !== 1) {
                    gridSquare.classList.add("ship");
                } else {
                    gridSquare.classList.add("overlap");
                }
            }
            console.log("ppo");
            GRID_CONTAINER_1.appendChild(gridSquare);
        }
    }
}
