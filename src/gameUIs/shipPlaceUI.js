const shipPlacementDisplayer = (() => {
  const fleet = []

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
  
    ship.id = shipName;
    return ship;
  }

  function genButton(){
    const button = document.createElement("button");
    button.id = "toggle-axis";
    button.textContent = "X ➞";

    return button;
  }
  
  function removeShip(shipId){
    const shipToRemove = document.getElementById(shipId);
    shipToRemove.remove();
  }

  function addShip(shipId){
    let shipToAdd;
    for (let i = 0; i < fleet.length; i++){
      if (fleet[i].id === shipId){
        shipToAdd = fleet[i]
      }
    }
    const DOMShips = document.getElementById("ships");
    DOMShips.appendChild(shipToAdd);
    
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

  function display(player){
    const content = document.querySelector("main");

    const axisBtn = genButton();
    content.appendChild(axisBtn);

    const shipPlaceSection = document.createElement("div");
    shipPlaceSection.id = "ship-place-section";
    const grid = genGrid();
    shipPlaceSection.appendChild(grid);
  
    const ships = genShips(player);
    fleet.length = 0;
    fleet.push(...ships.children);
    shipPlaceSection.appendChild(ships);

    content.appendChild(shipPlaceSection);
  }

  return {display, removeShip, addShip};
})();

const squareInitializer = (() => {

  let axis = "HOR";
  let lengthOfShipToBePlaced = 0;
  let shipId;

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
      if (!player.shipPlaced(shipId)){
        squaresToHighlight.forEach((ele) => {
          unhighlightSquare(ele);
        });
      }
    })
    square.addEventListener("click", () => {
      if (shipId === null){
        return;
      }
      const squaresToHighlight = getSquares(squareId);
      if (spaceAvailable(squareId)){
        player.placeShip(shipId, squareId % 10, Math.floor(squareId / 10), axis);
        squaresToHighlight.forEach((ele) => {
          highlightSquare(ele, "valid");
        });
        shipPlacementDisplayer.removeShip(shipId);
        lengthOfShipToBePlaced = 0;
        shipId = null;
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

  function setShipId(id){
    shipId = id;
  }

  return {initSquare, setAxis, setShipId, setLengthOfShipToBePlaced};
})();

const gridInitializer = (() => {
  function initGrid(player){
    for (let shipId = 0; shipId < 100; shipId++){
      squareInitializer.initSquare(shipId, player);
    }
  }

  function updateGridSetting(selectedShipId, lengthOfShipToBePlaced, axis){
    squareInitializer.setAxis(axis);
    squareInitializer.setLengthOfShipToBePlaced(lengthOfShipToBePlaced);
    squareInitializer.setShipId(selectedShipId);
  }

  return {initGrid, updateGridSetting};
})();

const shipInitializer = (() => {
  let selectedShip;

  function getShipLength(DOMShip){
    return DOMShip.children.length;
  }

  function unSelectShip(){
    if (selectedShip !== undefined){
      selectedShip.classList.remove("selected");
    }
    gridInitializer.updateGridSetting(null, 0, "HOR")
  }

  function selectShip(DOMShip){
    selectedShip = DOMShip;
    selectedShip.classList.add("selected");
    gridInitializer.updateGridSetting(selectedShip.id, getShipLength(DOMShip), "HOR")
  }

  function changeSelectShip(DOMShip){
    unSelectShip();
    selectShip(DOMShip);
  }
  
  function initShips(){
  
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      ship.addEventListener("click", () => {
        changeSelectShip(ship);
      })
    })
    document.addEventListener("click", (e) => {
      const grid = document.getElementById("grid");
      for (let i = 0; i < ships.length; i++){
        if (e.target === ships[i] || ships[i].contains(e.target)){
          return;
        }
      }
      if (e.target === grid || grid.contains(e.target)){
        return;
      }
      unSelectShip();
    });
  }

  return {initShips};
})();

function initShipPlaceScreen(player){
  gridInitializer.initGrid(player);
  shipInitializer.initShips();
}

export default function loadShipPlaceScreen(player){
  shipPlacementDisplayer.display(player);
  initShipPlaceScreen(player);
}