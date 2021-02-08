import { createGrid, renderGrid, renderShipSelect } from "./rendering.js";
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

opponentGrid.placeRandom();

// get selected ship
// TODO: write about how insane this kind of style switching is!
document.querySelectorAll(".ship-select").forEach(shipSelect => {
    shipSelect.addEventListener("click", () => {
        if (gameState === "placement") {
            selectedShip = parseInt(shipSelect.dataset.value);
            playerGrid.selectedShip = selectedShip;
            renderGrid(
                GRID_CONTAINER_1,
                playerGrid.savedShipPos,
                playerGrid.selectedShipPos
            );

            document.querySelectorAll(".ship-select").forEach(shipSelect => {
                shipSelect.classList.remove("selected");
            });

            shipSelect.classList.add("selected");

            if (shipSelect.classList.contains("placed")) {
                shipSelect.classList.remove("placed");
            }
            renderShipSelect();
        }
    });

    // update selected item symbols
    shipSelect.addEventListener("mouseenter", () => {
        shipSelect.innerHTML += " &#9667;";
    });
    shipSelect.addEventListener("mouseleave", () => {
        if (
            !shipSelect.classList.contains("selected") &&
            !shipSelect.classList.contains("placed")
        ) {
            shipSelect.innerHTML = shipSelect.innerHTML.split(" ")[0];
        } else {
            let newInner = shipSelect.innerHTML
                .split(" ")
                .slice(0, 2)
                .join(" ");
            shipSelect.innerHTML = newInner;
        }
    });
});

// update selected ship location
GRID_CONTAINER_1.querySelectorAll(".grid-square").forEach(gridSquare => {
    gridSquare.addEventListener("mouseenter", event => {
        if (gameState === "placement" && selectedShip !== null) {
            currentMousePos = event.target.id
                .split("")
                .map(pos => parseInt(pos));
            playerGrid.updateSelectedShipPos(currentMousePos, shipDir);
            renderGrid(
                GRID_CONTAINER_1,
                playerGrid.savedShipPos,
                playerGrid.selectedShipPos
            );
        } else if (gameState === "placement" && selectedShip === null) {
            gridSquare.classList.add("mouse-location");
        }
    });

    gridSquare.addEventListener("mouseleave", () => {
        gridSquare.classList.remove("mouse-location");
    });
});

// rotate ship and delete selected ship
document.addEventListener("keydown", event => {
    if (gameState === "placement") {
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
    }
});
// clear ship if mouse leaves grid
GRID_CONTAINER_1.addEventListener("mouseleave", () => {
    if (gameState === "placement") {
        playerGrid.clearShipPos(selectedShip);
        renderGrid(
            GRID_CONTAINER_1,
            playerGrid.savedShipPos,
            playerGrid.selectedShipPos
        );
    }
});

// save ship or edit ship postion
GRID_CONTAINER_1.querySelectorAll(".grid-square").forEach(gridSquare => {
    gridSquare.addEventListener("click", () => {
        if (gameState === "placement") {
            if (playerGrid.saveSelectedShipPos()) {
                document
                    .querySelectorAll(".ship-select")
                    .forEach(shipSelect => {
                        if (
                            parseInt(shipSelect.dataset.value) === selectedShip
                        ) {
                            shipSelect.innerHTML = "&#10032; " + shipSelect.id;
                            shipSelect.classList.remove("selected");
                            shipSelect.classList.add("placed");
                        }
                    });
                selectedShip = null;
                renderGrid(
                    GRID_CONTAINER_1,
                    playerGrid.savedShipPos,
                    playerGrid.selectedShipPos
                );
            } else {
                selectedShip = playerGrid.getShipFromPos(gridSquare.id);
                currentMousePos = gridSquare.id
                    .split("")
                    .map(pos => parseInt(pos));

                playerGrid.clearShipPos(selectedShip);
                playerGrid.selectedShip = selectedShip;
                playerGrid.updateSelectedShipPos(currentMousePos, shipDir);
                console.log(playerGrid.selectedShipPos);
                renderGrid(
                    GRID_CONTAINER_1,
                    playerGrid.savedShipPos,
                    playerGrid.selectedShipPos
                );
            }
        }
    });
});

// clear grid
document.getElementById("clear").addEventListener("click", () => {
    if (gameState === "placement") {
        playerGrid.reset();
        renderGrid(
            GRID_CONTAINER_1,
            playerGrid.savedShipPos,
            playerGrid.selectedShipPos
        );
        document.querySelectorAll(".ship-select").forEach(shipSelect => {
            shipSelect.classList.remove("selected", "placed");
        });
        renderShipSelect();
    }
});

// place all ships randomly
document.getElementById("random").addEventListener("click", () => {
    if (gameState === "placement") {
        playerGrid.placeRandom();
        renderGrid(
            GRID_CONTAINER_1,
            playerGrid.savedShipPos,
            playerGrid.selectedShipPos
        );
        document.querySelectorAll(".ship-select").forEach(shipSelect => {
            shipSelect.classList.remove("selected");
            shipSelect.classList.add("placed");
        });
        renderShipSelect();
    }
});

// Start game
document.getElementById("start").addEventListener("click", () => {
    if (playerGrid.hasPlacedAllShips()) {
        gameState = states[1];
        document.getElementById("messages").textContent = "The game has begun!";
        createGrid(GRID_CONTAINER_1);
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
    } else {
        document.getElementById("messages").textContent =
            "Place all ships before starting a game...";
    }
});
