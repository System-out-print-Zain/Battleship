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

function genShips(player){
  const DOMShips = document.createElement("div");
  DOMShips.id = "ships";

  const playerShips = player.getShips();
  playerShips.forEach(ship => {
    DOMShips.appendChild(genShip(ship.length));
  });

  return DOMShips;
}

export function displayShipPlaceScreen(player) {
  const content = document.querySelector("main");
  const grid = genGrid();
  content.appendChild(grid);

  const ships = genShips(player);
  content.appendChild(ships);
}

function initGrid(shipLength){

}

function initShips(){
  let selectedShip;

  const ships = document.querySelectorAll(".ship");
  console.log(ships);
  ships.forEach((ship) => {
    ship.addEventListener("click", () => {
      if (selectedShip !== undefined){
        selectedShip.classList.remove("selected");
      }
      selectedShip = ship;

      selectedShip.classList.add("selected");
      initGrid(selectedShip.length);
    })
  })
}

function initShipPlaceScreen(player){

}

export default function loadShipPlaceScreen(player){
  displayShipPlaceScreen(player);
  initShipPlaceScreen();
}