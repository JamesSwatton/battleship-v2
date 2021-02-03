import { renderGrid } from "./rendering.js";
import { Grid } from "./Grid.js";
import { GRID_CONTAINER_1 } from "./constants.js";

let states = [
    "placement",
    "playing"
]
let gameState = states[0];

let currentMousePos = 0;
let selectedShipType = "";
let shipDir = "horizontal";

const grid = new Grid();
renderGrid(grid.grid);

// get selected ship
document.querySelectorAll(".ship-select").forEach(shipSelect => {
    shipSelect.addEventListener("click", event => {
        selectedShipType = event.target.value;
        grid.selectedShipType = selectedShipType;
        renderGrid(grid.grid);
    });
});

// get mouse grid location
GRID_CONTAINER_1.addEventListener("mouseover", event => {
    currentMousePos = event.target.id.split("-").map(pos => parseInt(pos));
    grid.updateShipPos(currentMousePos, shipDir);
    renderGrid(grid.grid);
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
    } else if (keyCode = 8) {
        grid.clearShip(selectedShipType);
    }
    grid.updateShipPos(currentMousePos, shipDir);
    renderGrid(grid.grid);
});

// save ship position by passing null to selected ship
GRID_CONTAINER_1.addEventListener("click", () => {
    grid.saveShipPosition();
});

// clear grid
document.getElementById('clear-grid').addEventListener("click", () => {
    grid.reset();
    renderGrid(grid.grid);
})

// place all ships randomly
document.getElementById('place-random').addEventListener("click", () => {
    grid.placeRandom();
    renderGrid(grid.grid) 
})
