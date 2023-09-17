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

function genShip(shipLength){
  const ship = document.createElement("div");
  ship.classList.add("ship");

  for (let i = 0; i < shipLength; i++){
    const shipBlock = document.createElement("div");
    shipBlock.classList.add("ship-block");
    ship.appendChild(shipBlock);
  }

  return ship;
}

function genShips(){
  const ships = document.createElement("div");
  ships.id = "ships";

  return ships;
}

export function displayShipPlaceScreen() {
  const content = document.querySelector("main");
  const grid = genGrid();
  content.appendChild(grid);

  const ships = genShips();
  content.appendChild(ships);

}

function initShipPlaceScreen(player){

}

export default function loadShipPlaceScreen(){
  displayShipPlaceScreen();
  initShipPlaceScreen();
}