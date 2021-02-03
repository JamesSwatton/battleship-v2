import { GRID_SIZE, SHIPS } from "./constants.js";

export class Grid {
    constructor() {
        // both 2D arrays
        this._savedShipPos = [];
        this._selectedShipPos = [];

        this._overlap = false;
        this.reset();
    }

    get savedShipPos() {
        return this._savedShipPos;
    }

    get selectedShipPos() {
        return this._selectedShipPos;
    }

    _newGrid() {
        let grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            grid.push([]);
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y].push(0);
            }
        }
        return grid;
    }

    clearGrid(n) {
        if (n === 0) {
            this._savedShipPos = [];
            this._savedShipPos = this._newGrid();
        } else if (n === 1) {
            this._selectedShipPos = [];
            this._selectedShipPos = this._newGrid();
        }
    }

    updateSelectedShipPos(selectedShip, pos, dir) {
        const x = pos[0];
        const y = pos[1];
        if (selectedShip !== null) {
            this.clearGrid(1);
            if (dir === "horizontal") {
                const x = this._constrainPos(pos[0], SHIPS[selectedShip].size);
                for (let i = x; i < x + SHIPS[selectedShip].size; i++) {
                    this._selectedShipPos[y][i] = SHIPS[selectedShip].symbol;
                }
            } else if (dir === "vertical") {
                const y = this._constrainPos(pos[1], SHIPS[selectedShip].size);
                for (let j = y; j < y + SHIPS[selectedShip].size; j++) {
                    this._selectedShipPos[j][x] = SHIPS[selectedShip].symbol;
                }
            }
        }
    }

    saveSelectedShipPos() {
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (this._selectedShipPos[y][x] !== 0) {
                    this._savedShipPos[y][x] = this._selectedShipPos[y][x];
                }
            }
        }
        this.clearGrid(1);
    }

    clearShipPos(n) {
        this._ships[n].positions = [];
        this.clearGrid();
    }

    reset() {
        this._overlap = false;
        this.clearGrid(0);
        this.clearGrid(1);
    }

    placeRandom() {
        const dirs = ["horizontal", "vertical"];
        const randomDir = () => dirs[Math.floor(Math.random() * 2)];
        const getRandom = () => Math.floor(Math.random() * 10);
        console.log(randomDir(), getRandom());
        this._ships.forEach(ship => {
            let randPos = [getRandom(), getRandom()];
            console.log(randPos);
            this.selectedShip = ship.type;
            this.updateShipPos(randPos);
            // if overlap repeat placement until no overlap
        });
    }

    // helpers
    _constrainPos(pos, size) {
        return pos < GRID_SIZE - size ? pos : GRID_SIZE - size;
    }

    _hasOverlap(shipPositions) {
        shipPositions.forEach(pos => {
            if (this._grid[pos[0]][pos[1]] !== 0) {
                return true;
            }
        });
        return false;
    }
}
