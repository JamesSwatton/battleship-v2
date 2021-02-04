import { createGrid, renderGrid } from "./rendering.js";
import { Grid } from "./Grid.js";
import { GRID_CONTAINER_1 } from "./constants.js";

let states = ["placement", "playing"];
let gameState = states[0];

const grid = new Grid();

let currentMousePos = 0;
let selectedShip = null;
let shipDir = "horizontal";

createGrid();

// get selected ship
document.querySelectorAll(".ship-select").forEach(shipSelect => {
    shipSelect.addEventListener("click", event => {
        selectedShip = parseInt(event.target.value);
        grid.selectedShip = selectedShip;
        renderGrid(grid.savedShipPos, grid.selectedShipPos);
    });
});

// update selected ship location
document.querySelectorAll(".grid-square").forEach(gridSquare => {
    gridSquare.addEventListener("mouseenter", event => {
        currentMousePos = event.target.id.split("").map(pos => parseInt(pos));
        grid.updateSelectedShipPos(currentMousePos, shipDir);
        renderGrid(grid.savedShipPos, grid.selectedShipPos);
    });
});

// rotate ship and delete selected ship
document.addEventListener("keydown", event => {
    let keyCode = event.keyCode;
    if (keyCode === 32) {
        if (shipDir === "horizontal") {
            shipDir = "vertical";
        } else if (shipDir === "vertical") {
            shipDir = "horizontal";
        }
    } else if ((keyCode = 8)) {
        grid.clearShipPos(selectedShip);
    }
    grid.updateSelectedShipPos(currentMousePos, shipDir);
    renderGrid(grid.savedShipPos, grid.selectedShipPos);
});

// clear ship if mouse leaves grid 
GRID_CONTAINER_1.addEventListener("mouseleave", () => {
    grid.clearShipPos(selectedShip);
    renderGrid(grid.savedShipPos, grid.selectedShipPos);
})

// save ship position by passing null to selected ship
GRID_CONTAINER_1.addEventListener("click", () => {
    if (grid.saveSelectedShipPos()) {
        renderGrid(grid.savedShipPos, grid.selectedShipPos);
    }
    grid._hasPlacedAllShips();
});

// clear grid
document.getElementById("clear-grid").addEventListener("click", () => {
    grid.reset();
    renderGrid(grid.savedShipPos, grid.selectedShipPos);
});

// place all ships randomly
document.getElementById("place-random").addEventListener("click", () => {
    grid.placeRandom();
    renderGrid(grid.savedShipPos, grid.selectedShipPos);
});
