import { createGrid, renderGrid } from "./rendering.js";
import { Grid } from "./Grid.js";
import { GRID_CONTAINER_1, GRID_CONTAINER_2 } from "./constants.js";

let states = ["placement", "game"];
let gameState = states[0];

const playerGrid = new Grid();
const opponentGrid = new Grid();

let currentMousePos = 0;
let selectedShip = null;
let shipDir = "horizontal";

createGrid(GRID_CONTAINER_1);
createGrid(GRID_CONTAINER_2);

// get selected ship
document.querySelectorAll(".ship-select").forEach(shipSelect => {
    shipSelect.addEventListener("click", event => {
        console.log("hi");
        selectedShip = parseInt(event.target.value);
        playerGrid.selectedShip = selectedShip;
        renderGrid(
            GRID_CONTAINER_1,
            playerGrid.savedShipPos,
            playerGrid.selectedShipPos
        );
    });
});

// update selected ship location
GRID_CONTAINER_1.querySelectorAll(".grid-square").forEach(gridSquare => {
    gridSquare.addEventListener("mouseenter", event => {
        console.log(gameState);
        currentMousePos = event.target.id.split("").map(pos => parseInt(pos));
        playerGrid.updateSelectedShipPos(currentMousePos, shipDir);
        renderGrid(
            GRID_CONTAINER_1,
            playerGrid.savedShipPos,
            playerGrid.selectedShipPos
        );
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
        playerGrid.clearShipPos(selectedShip);
    }
    playerGrid.updateSelectedShipPos(currentMousePos, shipDir);
    renderGrid(
        GRID_CONTAINER_1,
        playerGrid.savedShipPos,
        playerGrid.selectedShipPos
    );
});
// clear ship if mouse leaves grid
GRID_CONTAINER_1.addEventListener("mouseleave", () => {
    playerGrid.clearShipPos(selectedShip);
    renderGrid(
        GRID_CONTAINER_1,
        playerGrid.savedShipPos,
        playerGrid.selectedShipPos
    );
});

// save ship position by passing null to selected ship
GRID_CONTAINER_1.querySelectorAll(".grid-square").forEach(gridSquare => {
    gridSquare.addEventListener("click", () => {
        if (playerGrid.saveSelectedShipPos()) {
            renderGrid(
                GRID_CONTAINER_1,
                playerGrid.savedShipPos,
                playerGrid.selectedShipPos
            );
        }
        if (playerGrid._hasPlacedAllShips()) {
            // swap grids
            gameState = states[1];
            console.log(gameState);
            // renderGrid(
            //     GRID_CONTAINER_1,
            //     opponentGrid.savedShipPos,
            //     opponentGrid.selectedShipPos
            // );
            // renderGrid(
            //     GRID_CONTAINER_2,
            //     playerGrid.savedShipPos,
            //     playerGrid.selectedShipPos
            // );
        }
    });
});

// clear grid
document.getElementById("clear-grid").addEventListener("click", () => {
    playerGrid.reset();
    renderGrid(
        GRID_CONTAINER_1,
        playerGrid.savedShipPos,
        playerGrid.selectedShipPos
    );
});

// place all ships randomly
document.getElementById("place-random").addEventListener("click", () => {
    playerGrid.placeRandom();
    renderGrid(
        GRID_CONTAINER_1,
        playerGrid.savedShipPos,
        playerGrid.selectedShipPos
    );
});
// swap grids
document.getElementById("swap-grid").addEventListener("click", () => {
    renderGrid(
        GRID_CONTAINER_1,
        opponentGrid.savedShipPos,
        opponentGrid.selectedShipPos
    );
    renderGrid(
        GRID_CONTAINER_2,
        playerGrid.savedShipPos,
        playerGrid.selectedShipPos
    );
});
