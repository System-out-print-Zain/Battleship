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

function displayShipPlaceScreen(player) {
  const content = document.querySelector("main");
  const grid = genGrid();
  content.appendChild(grid);

  const ships = genShips(player);
  content.appendChild(ships);
}

const squareInitializer = (() => {

  let axis = "x";
  let lengthOfShipToBePlaced = 0;

  function getSquares(startInd){
    const squares = [];
    if (axis === "x"){
      const endOfRow = Math.floor(startInd / 10) * 10 + 9;
      for (let i = 0; i < Math.min(lengthOfShipToBePlaced, endOfRow - startInd + 1); i ++){
        const square = document.getElementById(`${startInd + i}`);
        squares.push(square);
      }
    }
    if (axis === "y"){
      for (let i = 0; i < lengthOfShipToBePlaced; i++){
        const square = document.getElementById(`${startInd + 10*i}`);
        if (square !== null){
          squares.push(square);
        }
      }
    }
    return squares;
  }

  function spaceAvailable(startId){
    const rowNum = Math.floor(startId/10);
    if (axis === "x"){
      return startId + lengthOfShipToBePlaced - 1 < (rowNum + 1) * 10;
    }
    return startId + (lengthOfShipToBePlaced - 1) * 10 < 100;
  }

  function highlightSquare(square, validity){
    if (validity === "valid"){
      square.classList.add("highlight-green");
    }
    if (validity === "invalid"){
      square.classList.add("highlight-red");
    }
  }

  function unhighlightSquare(square){
    square.classList.remove("highlight-green");
    square.classList.remove("highlight-red");
  }

  function initSquare(squareId){
    const square = document.getElementById(`${squareId}`);
  
    square.addEventListener("mouseover", () => {
      const squaresToHighlight = getSquares(squareId);
      squaresToHighlight.forEach((ele) => {
        if (spaceAvailable(squareId)){
          highlightSquare(ele, "valid");
        }
        else{
          highlightSquare(ele, "invalid");
        }
      });
    })
    square.addEventListener("mouseout", () => {
      const squaresToUnHighlight = getSquares(squareId);
      squaresToUnHighlight.forEach((ele) => {
        unhighlightSquare(ele);
      });
    })
  }

  function setAxis(dir){
    if (dir === "x" || dir === "y"){
      axis = dir;
    }
  }

  function setLengthOfShipToBePlaced(length){
    lengthOfShipToBePlaced = length;
  }

  return {initSquare, setAxis, setLengthOfShipToBePlaced};
})();

const gridInitializer = (() => {
  function initGrid(){
    for (let shipId = 0; shipId < 100; shipId++){
      squareInitializer.initSquare(shipId);
    }
  }

  function updateGridSetting(lengthOfShipToBePlaced, axis){
    squareInitializer.setAxis(axis);
    squareInitializer.setLengthOfShipToBePlaced(lengthOfShipToBePlaced);
  }

  return {initGrid, updateGridSetting};
})();

const shipInitializer = (() => {
  function getShipLength(DOMShip){
    return DOMShip.children.length;
  }
  
  function initShips(){
    gridInitializer.initGrid();
    let selectedShip;
  
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      ship.addEventListener("click", () => {
        if (selectedShip !== undefined){
          selectedShip.classList.remove("selected");
        }
        selectedShip = ship;
  
        selectedShip.classList.add("selected");
        gridInitializer.updateGridSetting(getShipLength(ship), "y");
      })
    })
  }

  return {initShips};
})();

function initShipPlaceScreen(player){
  gridInitializer.initGrid();
  shipInitializer.initShips();
}

export default function loadShipPlaceScreen(player){
  displayShipPlaceScreen(player);
  initShipPlaceScreen();
}