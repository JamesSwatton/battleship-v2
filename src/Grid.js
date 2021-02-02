import { GRID_SIZE } from "./constants.js";

export class Grid {
    constructor() {
        // prettier-ignore
        this._ships = [
            { type: "carrier",     size: 5, hits: 0, positions: [] },
            { type: "battleship",  size: 4, hits: 0, positions: [] },
            { type: "crusier",     size: 3, hits: 0, positions: [] },
            { type: "sub",         size: 2, hits: 0, positions: [] },
            { type: "destroyer",   size: 2, hits: 0, positions: [] },
        ];
        this._grid = this._createGrid();
        this._selectedShipType = null;
        this._overlap = false;
    }

    get grid() {
        return this._grid;
    }

    set selectedShipType(shipType) {
        this._ships.forEach(ship => {
            if (ship.type === shipType) {
                this._selectedShipType = ship;
            }
        });
    }

    _createGrid() {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            grid.push([]);
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y].push(0);
            }
        }
        return grid;
    }

    _addAllShipPos() {
        let overlap = false;
        this._ships.forEach(ship => {
            if (ship.positions) {
                ship.positions.forEach(pos => {
                    if (this._hasOverlap(pos)) {
                        overlap = true;
                        this._grid[pos[0]][pos[1]] = 1;
                    } else {
                        this._grid[pos[0]][pos[1]] = ship.type;
                    }
                });
            }
        });
        this._overlap = overlap ;
    }

    updateShipPos(pos, dir) {
        const x = pos[0];
        const y = pos[1];
        if (this._selectedShipType) {
            this._selectedShipType.positions = [];
            if (dir === "horizontal") {
                const x = this._constrainPos(pos[0]);
                for (let i = x; i < x + this._selectedShipType.size; i++) {
                    this._selectedShipType.positions.push([y, i]);
                }
            } else if (dir === "vertical") {
                const y = this._constrainPos(pos[1]);
                for (let j = y; j < y + this._selectedShipType.size; j++) {
                    this._selectedShipType.positions.push([j, x]);
                }
            }
        }
        this._grid = this._createGrid();
        this._addAllShipPos();
    }

    saveShipPosition() {
        if (this._overlap) {
            return 
        }
        this._selectedShipType = null;
    }

    // helpers
    _constrainPos(pos) {
        return pos < GRID_SIZE - this._selectedShipType.size
            ? pos
            : GRID_SIZE - this._selectedShipType.size;
    }

    _hasOverlap(pos) {
        if (this._grid[pos[0]][pos[1]] !== 0) {
            return true;
        }
        return false;
    }
}
