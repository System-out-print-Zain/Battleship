const gridSize = 10;

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
}