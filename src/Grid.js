import { GRID_SIZE } from "./constants.js";

export class Grid {
    constructor() {
        // prettier-ignore
        this._ships = {
            carrier:    { size: 5, hits: 0, positions: [] },
            battleship: { size: 4, hits: 0, positions: [] },
            crusier:    { size: 3, hits: 0, positions: [] },
            sub:        { size: 2, hits: 0, positions: [] },
            destroyer:  { size: 2, hits: 0, positions: [] },
        };
        this._grid = this.createGrid();
        this._selectedShipType = null;
    }

    get grid() {
        return this._grid;
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            grid.push([]);
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y].push(0);
            }
        }
        console.log(grid);
        return grid;
    }

    updateShipPos(shipType, pos, dir = "horizontal") {
        const x = pos[0];
        const y = pos[1];
        this._grid = this.createGrid();
        if (shipType in this._ships) {
            if (dir === "horizontal") {
                for (let i = x; i < x + this._ships[shipType].size; i++) {
                    this._grid[y][i] = shipType;
                }
            }
        }
    }
}
