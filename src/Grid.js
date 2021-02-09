import { GRID_SIZE } from "./constants.js";

export class Grid {
    constructor() {
        //prettier-ignore
        this._ships = [
            { type: "carrier",    size: 5, hits: 0, positions: [] },
            { type: "battleship", size: 4, hits: 0, positions: [] },
            { type: "crusier",    size: 3, hits: 0, positions: [] },
            { type: "submarine",  size: 3, hits: 0, positions: [] },
            { type: "destroyer",  size: 2, hits: 0, positions: [] }
        ];
        this._selectedShip = null;
        this._overlap = false;
        this.reset();
    }

    get savedShipPos() {
        return this._ships
            .map(ship => {
                if (
                    !this._selectedShip ||
                    ship.type !== this._selectedShip.type
                ) {
                    return ship.positions;
                }
            })
            .flat();
    }

    set selectedShip(shipType) {
        this._selectedShip = this._ships.find(s => s.type === shipType);
        this._selectedShip.positions = [];
    }

    get selectedShipPos() {
        return this._selectedShip ? this._selectedShip.positions : [];
    }

    reset() {
        this._ships.forEach(ship => (ship.positions = []));
        this._overlap = false;
        this._selectedShip = null;
    }

    updateSelectedShipPos(pos, dir) {
        let x = pos[0];
        let y = pos[1];
        if (this._selectedShip !== null) {
            this._selectedShip.positions = [];
            if (dir === "horizontal") {
                x = this._constrainPos(pos[0], this._selectedShip.size);
                for (let i = x; i < x + this._selectedShip.size; i++) {
                    this._selectedShip.positions.push(`${i}${y}`);
                }
            } else if (dir === "vertical") {
                y = this._constrainPos(pos[1], this._selectedShip.size);
                for (let j = y; j < y + this._selectedShip.size; j++) {
                    this._selectedShip.positions.push(`${x}${j}`);
                }
            }
        }
    }

    saveSelectedShipPos() {
        if (this._hasOverlap() || this._selectedShip === null) {
            return false;
        }
        this._selectedShip = null;
        return true;
    }

    clearShipPos(shipType) {
        if (this._selectedShip) {
            this._ships.find(s => s.type === shipType).positions = [];
        }
    }

    placeRandom() {
        const dirs = ["horizontal", "vertical"];
        let randomDir = () => dirs[Math.floor(Math.random() * 2)];

        this.reset();

        this._ships.forEach(ship => {
            this._selectedShip = ship;
            this.updateSelectedShipPos(this._getRandomPos(), randomDir());
            while (this._hasOverlap()) {
                this.updateSelectedShipPos(this._getRandomPos(), randomDir());
            }
            this.saveSelectedShipPos();
        });
    }

    checkForHit(pos) {
        let result = false;
        this._ships.forEach(s => {
            if (s.positions.includes(pos)) {
                s.hits += 1;
                result = true;
            }
        });
        return result;
    }

    // helpers
    _constrainPos(pos, size) {
        return pos < GRID_SIZE - size ? pos : GRID_SIZE - size;
    }

    _hasOverlap() {
        if (this._selectedShip) {
            let result = false;
            this._selectedShip.positions.forEach(pos => {
                if (this.savedShipPos.includes(pos)) {
                    result = true;
                }
            });
            return result;
        }
    }

    hasPlacedAllShips() {
        const totalPos = this._ships
            .map(ship => ship.size)
            .reduce((a, b) => a + b);
        return this.savedShipPos.length === totalPos ? true : false;
    }

    _getRandomPos() {
        let randX = Math.floor(Math.random() * 10);
        let randY = Math.floor(Math.random() * 10);
        let randPos = [randX, randY];
        return randPos;
    }

    getShipFromPos(pos) {
        let result = null;
        this._ships.forEach((ship, i) => {
            if (ship.positions.includes(pos)) {
                result = ship.type;
            }
        });
        return result;
    }
}
