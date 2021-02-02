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
        this._grid = this.createGrid();
        this._selectedShipType = null;
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

    createGrid() {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            grid.push([]);
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y].push(0);
            }
        }
        return grid;
    }

    updateShipPos(pos, dir) {
        const x = pos[0];
        const y = pos[1];
        this._grid = this.createGrid();
        if (this._selectedShipType) {
            if (dir === "horizontal") {
                const x = this.constrainPos(pos[0]);
                for (let i = x; i < x + this._selectedShipType.size; i++) {
                    this._grid[y][i] = this._selectedShipType.type;
                }
            } else if (dir === "vertical") {
                const y = this.constrainPos(pos[1]);
                for (let j = y; j < y + this._selectedShipType.size; j++) {
                    this._grid[j][x] = this._selectedShipType.type;
                }
            }
        }
    }

    constrainPos(pos) {
        return pos < GRID_SIZE - this._selectedShipType.size
            ? pos
            : GRID_SIZE - this._selectedShipType.size;
    }
}
