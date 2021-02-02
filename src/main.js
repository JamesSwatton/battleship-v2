import { renderGrid } from "./rendering.js";
import { Grid } from "./Grid.js";
import { GRID_CONTAINER_1 } from "./constants.js";

let currentMousePos = 0;
let shipDir = "horizontal";

const grid = new Grid();
renderGrid(grid.grid);

// get selected ship
document.querySelectorAll(".ship-select").forEach(shipSelect => {
    shipSelect.addEventListener("click", event => {
        grid.selectedShipType = event.target.value;
    });
});

// get mouse grid location
GRID_CONTAINER_1.addEventListener("mouseover", event => {
    currentMousePos = event.target.id.split("-").map(pos => parseInt(pos));
    grid.updateShipPos(currentMousePos, shipDir);
    renderGrid(grid.grid);
});

// rotate ship
document.addEventListener("keydown", event => {
    const keyCode = event.keyCode;
    if (keyCode === 32) {
        if (shipDir === "horizontal") {
            shipDir = "vertical";
        } else if (shipDir === "vertical") {
            shipDir = "horizontal";
        }
    }
    grid.updateShipPos(currentMousePos, shipDir);
    renderGrid(grid.grid);
});
