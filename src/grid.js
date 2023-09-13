const GRIDSIZE = 10;

function validateCoords(x, y){
    if ((x >= 0 && x < GRIDSIZE) || (y >= 0 && y < GRIDSIZE))
    {
        return new Error("Coordinates out of range");
    } 
    return true;
}

export default class Grid {
    constructor() {
        // Generate two dim array

        this.cells = []

        for (let i = 0; i < GRIDSIZE; i ++)
        {
            this.cells.push([]);
            for (let j = 0; j < GRIDSIZE; j ++)
            {
                // null indicates that the square is empty
                this.cells[i].push([null, "NOTATTACKED"]);
            }
        }

    }

    cellEmpty(cellX, cellY){
        validateCoords(cellX, cellY);
        return this.cells[cellY][cellX][0] === null;
    }

    cellAttacked(cellX, cellY){
        validateCoords(cellX, cellY);
        return this.cells[cellY][cellX][1] === "ATTACKED";
    }

    markAttack(cellX, cellY){
        validateCoords(cellX, cellY)
        this.cells[cellY][cellX][1] = "ATTACKED";

        const ship = this.cells[cellY][cellX][0]

        if (ship !== null)
        {
            ship.hit();
        }
    }

    placeShipVert(ship, startCellX, startCellY){
        const len = ship.length;
        for (let i = 0; i < len; i++){
            if (this.cellEmpty(startCellX, startCellY + i)){
                this.cells[startCellY + i][startCellX][0] = ship
            }
            else{
                throw new Error("There is not enough space");
            }
        }
    }

    placeShipHoriz(ship, startCellX, startCellY){
        const len = ship.length;
        for (let i = 0; i < len; i++){
            if (this.cellEmpty(startCellX + i, startCellY)){
                this.cells[startCellY][startCellX + i][0] = ship
            }
            else{
                throw new Error("There is not enough space");
            }
        }
    }

    placeShip(ship, startCellX, startCellY, direction){
        if (direction === "VERT"){this.placeShipVert(ship, startCellX, startCellY)}
        if (direction === "HOR"){this.placeShipHoriz(ship, startCellX, startCellY)}
    }