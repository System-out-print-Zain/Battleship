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

function genShip(shipLength, shipName){
  const ship = document.createElement("div");
  ship.classList.add("ship");

  for (let i = 0; i < shipLength; i++){
    const shipBlock = document.createElement("div");
    shipBlock.classList.add("ship-block");
    ship.appendChild(shipBlock);
  }

  ship.classList.add(shipName);
  return ship;
}

function genShips(player){
  const DOMShips = document.createElement("div");
  DOMShips.id = "ships";

  const playerShips = player.getShips();
  playerShips.forEach(ship => {
    DOMShips.appendChild(genShip(ship.length, ship.name));
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

  let axis = "HOR";
  let lengthOfShipToBePlaced = 0;
  let shipName;

  function getSquares(startInd){
    const squares = [];
    if (axis === "HOR"){
      const endOfRow = Math.floor(startInd / 10) * 10 + 9;
      for (let i = 0; i < Math.min(lengthOfShipToBePlaced, endOfRow - startInd + 1); i ++){
        const square = document.getElementById(`${startInd + i}`);
        squares.push(square);
      }
    }
    if (axis === "VERT"){
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
    if (axis === "HOR"){
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

  function initSquare(squareId, player){
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
      const squaresToHighlight = getSquares(squareId);
      console.log(player.shipPlaced(shipName), shipName, player.grid);
      if (!player.shipPlaced(shipName)){
        squaresToHighlight.forEach((ele) => {
          unhighlightSquare(ele);
        });
      }
    })
    square.addEventListener("click", () => {
      const squaresToHighlight = getSquares(squareId);
      if (spaceAvailable(squareId)){
        player.placeShip(shipName, squareId % 10, Math.floor(squareId / 10), axis);
        squaresToHighlight.forEach((ele) => {
          highlightSquare(ele, "valid");
        });
        lengthOfShipToBePlaced = 0;
        shipName = null;
      }
    })
  }

  function setAxis(dir){
    if (dir === "HOR" || dir === "VERT"){
      axis = dir;
    }
  }

  function setLengthOfShipToBePlaced(length){
    lengthOfShipToBePlaced = length;
  }

  function setShipName(name){
    shipName = name;
  }

  return {initSquare, setAxis, setShipName, setLengthOfShipToBePlaced};
})();

const gridInitializer = (() => {
  function initGrid(player){
    for (let shipId = 0; shipId < 100; shipId++){
      squareInitializer.initSquare(shipId, player);
    }
  }

  function updateGridSetting(selectedShipName, lengthOfShipToBePlaced, axis){
    squareInitializer.setAxis(axis);
    squareInitializer.setLengthOfShipToBePlaced(lengthOfShipToBePlaced);
    squareInitializer.setShipName(selectedShipName);
  }

  return {initGrid, updateGridSetting};
})();

const shipInitializer = (() => {
  function getShipLength(DOMShip){
    return DOMShip.children.length;
  }
  
  function initShips(){
    let selectedShip;
  
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      ship.addEventListener("click", () => {
        if (selectedShip !== undefined){
          selectedShip.classList.remove("selected");
        }
        selectedShip = ship;
  
        selectedShip.classList.add("selected");
        gridInitializer.updateGridSetting(selectedShip.classList[1], getShipLength(ship), "HOR");
      })
    })
  }

  return {initShips};
})();

function initShipPlaceScreen(player){
  gridInitializer.initGrid(player);
  shipInitializer.initShips();
}

export default function loadShipPlaceScreen(player){
  displayShipPlaceScreen(player);
  initShipPlaceScreen(player);
}