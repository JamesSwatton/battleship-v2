export const GRID_SIZE = 10;
// prettier-ignore
export const SHIPS = {             
    "carrier":     { size: 5, symbol: "A" },
    "battleship":  { size: 4, symbol: "B" },
    "crusier":     { size: 3, symbol: "C" },
    "sub":         { size: 3, symbol: "D" },
    "destroyer":   { size: 2, symbol: "E" },
};
export const GRID_CONTAINER_1 = document.getElementById("grid-container-1");
export const GRID_CONTAINER_2 = document.getElementById("grid-container-2");
export const SHIP_SELECT_CONTAINER = document.getElementById(
    "ship-select-container"
);
