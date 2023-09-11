const gridSize = 10;

function validateCoords(x, y){
    if ((x >= 0 && x < gridSize) || (y >= 0 && y < gridSize))
    {
        return new Error("Coordinates out of range");
    } 
    return true;
}

export default class Grid {
    constructor() {
        // Generate two dim array

        this.cells = []

        for (let i = 0; i < gridSize; i ++)
        {
            this.cells.push([]);
            for (let j = 0; j < gridSize; j ++)
            {
                // null indicates that the square is empty
                // "NA" means 'not attacked'; "A" means 'attacked'
                this.cells[i].push([null, "NA"]);
            }
        }

    }

    checkSquareEmpty(x, y){
        validateCoords(x, y);
        return this.cells[y][x][0] === null;
    }

    checkSquareAttacked(x, y){
        validateCoords(x, y);
        return this.cells[y][x][1] === "A";
    }

    markAttack(x, y){
        validateCoords(x, y)
        this.cells[y][x][1] = "A";

        const ship = this.cells[y][x][0]

        if (ship !== null)
        {
            ship.hit();
        }
    }
}