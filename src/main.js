import { renderGrid } from "./rendering.js";
import { Grid } from "./Grid.js";

let currentMousePos = 0;
let selectedShip = null;

const grid = new Grid();
renderGrid(grid.grid);

// get selected ship
document.querySelectorAll(".ship-select").forEach((shipSelect) => {
    shipSelect.addEventListener("click", (event) => {
        selectedShip = event.target.value;
        console.log(selectedShip);
        document.getElementById("selected-ship").textContent =
            event.target.value;
    });
});

// get mouse grid location
document.querySelectorAll(".grid-square").forEach((gridSquare) => {
    gridSquare.addEventListener("mouseenter", (event) => {
        currentMousePos = event.target.id
            .split("-")
            .map((pos) => parseInt(pos));
        console.log(currentMousePos);
        grid.updateShipPos(selectedShip, currentMousePos);
        renderGrid(grid.grid);
    });
});
