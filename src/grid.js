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

    checkSquareEmpty(cellX, cellY){
        validateCoords(cellX, cellY);
        return this.cells[cellY][cellX][0] === null;
    }

    checkSquareAttacked(cellX, cellY){
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
}