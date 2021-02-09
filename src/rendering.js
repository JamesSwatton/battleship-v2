import {
    GRID_SIZE,
    GRID_CONTAINER_1,
    GRID_CONTAINER_2,
    SHIP_SELECT_CONTAINER
} from "./constants.js";

import { newElement } from "./helpers/newElement.js";

export function createGrid(gridContainer) {
    gridContainer.innerHTML = "";
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let id = `${x}${y}`;
            const gridSquare = newElement(id, "grid-square", "div");
            gridContainer.appendChild(gridSquare);
        }
    }
}

export function renderGrid(gridContainer, savePos, selectPos) {
    gridContainer.querySelectorAll(".grid-square").forEach(gridSquare => {
        let id = gridSquare.id;
        gridSquare.classList.remove("ship", "overlap");
        if (savePos.includes(id) && selectPos.includes(id)) {
            gridSquare.classList.add("overlap");
        } else if (savePos.includes(id) || selectPos.includes(id)) {
            gridSquare.classList.add("ship");
        }
    });
}

export function renderShipSelect() {
    document.querySelectorAll(".ship-select").forEach(shipSelect => {
        let capName =
            shipSelect.id.charAt(0).toUpperCase() + shipSelect.id.slice(1);
        if (
            !shipSelect.classList.contains("selected") &&
            !shipSelect.classList.contains("placed")
        ) {
            shipSelect.innerHTML = capName;
        } else if (shipSelect.classList.contains("selected")) {
            shipSelect.innerHTML = "&#9642; " + capName;
        } else if (shipSelect.classList.contains("placed")) {
            shipSelect.innerHTML = "&#10032; " + capName;
        }
    });
}

export function renderHitMiss(pos, isHit) {
    let gridSquare = document.getElementById(pos);
    if (isHit) {
        gridSquare.classList.remove("ship");
        gridSquare.classList.add("overlap");
        gridSquare.innerHTML = "<p>&#9670;</p>";
    } else {
        gridSquare.innerHTML = "<p>&#9671;</p>";
    }
}
