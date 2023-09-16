function genGrid() {
  const grid = document.createElement("div");
  grid.id = "grid";

  for (let i = 0; i < 10; i++)
  {
    for (let j = 0; j < 10; j++)
    {
        const square = document.createElement("div");
        square.id = `${i * 10 + j}`;
        square.classList.add("square");
        grid.appendChild(square);
    }
  }

  return grid;
}

function genShips(){
  const ships = document.createElement("div");
  ships.id = "ships";
}

function displayShipPlaceScreen() {
  const content = document.querySelector("main");
  const grid = genGrid();
  content.appendChild(grid);

  const ships = genShips();
  content.appendChild(ships);

}