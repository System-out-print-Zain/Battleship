import Grid from "../grid";

describe("Test Instantiation", () => {
    test("10 x 10 2d array is generated internally.", () => {
        const testGrid = new Grid();
    
        expect(testGrid.cells.length === 10 && testGrid.cells[0].length === 10).toBeTruthy();
    })
    
    test("Each cell is initially empty and unattacked.", () => {
    
        const testGrid = new Grid();
    
        let allEmpty = true;
        let allUnAttacked = true;
    
        for (let i = 0; i < 10; i ++)
        {
            for (let j = 0; j < 10; j ++)
            {
                if (testGrid.cells[i][j][0] !== null){
                    allEmpty = false;
                }
                if (testGrid.cells[i][j][1] !== "NOTATTACKED"){
                    allUnAttacked = false;
                }
            }
        }
    
        expect(allEmpty).toBeTruthy();
        expect(allUnAttacked).toBeTruthy();
    })
})

describe("Test checkSquareEmpty method", () => {
    test("Properly checks if a cell is empty or not.", () => {
        const testGrid = new Grid();
    
        expect(testGrid.checkSquareEmpty(0, 0) === true).toBeTruthy();
    
        const mockShip = {}
    
        testGrid.cells[0][0][0] = mockShip;
    
        expect(testGrid.checkSquareEmpty(0, 0) === true).toBeFalsy();
    })
})

describe("Test checkSquareAttacked method", () => {
    test("Properly checks if a cell has been attacked or not.", () => {
        const testGrid = new Grid();
    
        expect(testGrid.checkSquareAttacked(0, 0) === false).toBeTruthy();
    
        testGrid.cells[0][0][1] = "ATTACKED";
    
        expect(testGrid.checkSquareAttacked(0, 0) === false).toBeFalsy();
    })
})

describe("Test markAttacked method", () => {
    test("An unattacked square is marked attacked", () => {
        const testGrid = new Grid();

        testGrid.markAttack(0, 0)

        expect(testGrid.cells[0][0][1]).toBe("ATTACKED");
    })

    test("An attacked square remains attacked", () => {
        const testGrid = new Grid();

        testGrid.cells[0][0][1] = "ATTACKED";

        testGrid.markAttack(0, 0)

        expect(testGrid.cells[0][0][1]).toBe("ATTACKED");
    })

    test("If a ship is occupying the unattacked square, it should call its hit method once", () => {
        const testGrid = new Grid();

        const ship = {
            hit: jest.fn(),
        }

        testGrid.cells[0][0][0] = ship;

        testGrid.markAttack(0, 0)

        expect(ship.hit.mock.calls).toHaveLength(1);
    })
})