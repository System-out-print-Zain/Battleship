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

describe("Test squareEmpty method", () => {
    test("Properly checks if a cell is empty or not.", () => {
        const testGrid = new Grid();
    
        expect(testGrid.squareEmpty(0, 0) === true).toBeTruthy();
    
        const mockShip = {}
    
        testGrid.cells[0][0][0] = mockShip;
    
        expect(testGrid.squareEmpty(0, 0) === true).toBeFalsy();
    })
})

describe("Test squareAttacked method", () => {
    test("Properly checks if a cell has been attacked or not.", () => {
        const testGrid = new Grid();
    
        expect(testGrid.squareAttacked(0, 0) === false).toBeTruthy();
    
        testGrid.cells[0][0][1] = "ATTACKED";
    
        expect(testGrid.squareAttacked(0, 0) === false).toBeFalsy();
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

describe("Test placeShip method", () => {
    const ship = {}

    test("If there is room, the ship must be placed", () => {
        ship.length = 3;
        const testGrid = new Grid();

        testGrid.placeShip(ship, 1, 3, "HOR");
        expect(testGrid.cells[3][1][0]).toBe(ship);
        expect(testGrid.cells[3][2][0]).toBe(ship);
        expect(testGrid.cells[3][3][0]).toBe(ship);
        expect(testGrid.cells[3][4][0]).toBe(null);

        ship.length = 2
        testGrid.placeShip(ship, 0, 0, "VERT");
        expect(testGrid.cells[0][0][0]).toBe(ship);
        expect(testGrid.cells[1][0][0]).toBe(ship);
        expect(testGrid.cells[2][0][0]).toBe(null);
    })

    test("If there is no room, throw error", () => {
        ship.length = 5;
        const secShip = {};
        const testGrid = new Grid();
        testGrid.cells[5][5][0] = secShip

        expect(() => {testGrid.placeShip(ship, 5, 1, "VERT")}).toThrow("There is not enough space");
    })
})