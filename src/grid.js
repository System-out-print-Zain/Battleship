const gridSize = 10;

function validateCoords(x, y){
    if ((x >= 0 && x < gridSize) || (y >= 0 && y < gridSize)) return new Error("Coordinates out of range");
    return true;
}

class Grid {
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
        
        validateCoords();
        return this.grid[y][x][0] === null
        
    }
}