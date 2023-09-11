import Grid from "../grid";

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
            if (testGrid.cells[i][j][1] !== "NA"){
                allUnAttacked = false;
            }
        }
    }

    expect(allEmpty).toBeTruthy();
    expect(allUnAttacked).toBeTruthy();
})

