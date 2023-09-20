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

  function genAxisButton(){
    const button = document.createElement("button");
    button.id = "toggle-axis";
    button.textContent = "X ➞";

    return button;
  }

  function genDoneButton(){
    const button = document.createElement("button");
    button.id = "done";
    button.classList.add("hidden");
    button.textContent = "✓";

    return button;
  }

  function showDoneButton(){
    const button = document.getElementById("done");
    button.classList.remove("hidden");
  }

  function hideDoneButton(){
    const button = document.getElementById("done");
    button.classList.add("hidden");
  }

  function allShipsRemoved(){
    let allRemoved = true;
    for (let i = 0; i < fleet.length; i++){
      if (document.body.contains(fleet[i])){
        allRemoved = false;
      }
    }
    return allRemoved;
  }
  
  function removeShip(shipId){
    const shipToRemove = document.getElementById(shipId);
    shipToRemove.remove();
    if (allShipsRemoved()){
      showDoneButton();
    }
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
    content.innerHTML = "";

    const axisBtn = genAxisButton();
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

    const doneBtn = genDoneButton();
    content.appendChild(doneBtn);
  }

  return {display, removeShip, addShip};
})();

const squareInitializer = (() => {

  let axis = "HOR";
  let lengthOfShipToBePlaced = 0;
  let shipId;

  function getSquares(startInd, player){
    const squares = [];
    if (axis === "HOR"){
      const endOfRow = Math.floor((startInd / 10)) * 10 + 9;
      for (let i = 0; i < Math.min(lengthOfShipToBePlaced, endOfRow - startInd + 1); i++){
        if (player.gridCellEmpty((startInd + i) % 10, Math.floor((startInd + i) / 10))){
          const square = document.getElementById(`${startInd + i}`);
          squares.push(square);
        }
      }
    }
    if (axis === "VERT"){
      const currRow  = Math.floor(startInd / 10);
      for (let i = 0; i < Math.min(lengthOfShipToBePlaced, 10 - currRow); i++){
        if (player.gridCellEmpty((startInd + 10*i) % 10, Math.floor((startInd + 10*i) / 10))){
          const square = document.getElementById(`${startInd + 10*i}`);
          squares.push(square);
        }
      }
    }
    return squares;
  }

  function spaceAvailable(startId, player){
    const squaresThatCanBePlaced = getSquares(startId, player);
    return squaresThatCanBePlaced.length === lengthOfShipToBePlaced;
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
      const squaresToHighlight = getSquares(squareId, player);
      squaresToHighlight.forEach((ele) => {
        if (spaceAvailable(squareId, player)){
          highlightSquare(ele, "valid");
        }
        else{
          highlightSquare(ele, "invalid");
        }
      });
    })
    square.addEventListener("mouseout", () => {
      const squaresToHighlight = getSquares(squareId, player);
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
      const squaresToHighlight = getSquares(squareId, player);
      if (spaceAvailable(squareId, player)){
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

  function getAxis(){
    return axis;
  }

  return {initSquare, setAxis, setShipId, setLengthOfShipToBePlaced, getAxis};
})();

const gridInitializer = (() => {
  function initGrid(player){
    for (let shipId = 0; shipId < 100; shipId++){
      squareInitializer.initSquare(shipId, player);
    }
  }

  function getShipLength(id){
    const ship = document.getElementById(id);
    return ship === null ? 0 : ship.children.length;
  }

  function updateSelectedShip(newId){
    squareInitializer.setShipId(newId);
    squareInitializer.setLengthOfShipToBePlaced(getShipLength(newId));
  }

  function updateAxis(axis){
    squareInitializer.setAxis(axis);
  }

  function getAxis(){
    return squareInitializer.getAxis();
  }

  return {initGrid, updateAxis, updateSelectedShip, getAxis};
})();

const shipInitializer = (() => {
  let selectedShip;

  function unSelectShip(){
    if (selectedShip !== undefined){
      selectedShip.classList.remove("selected");
    }
    gridInitializer.updateSelectedShip(null);
  }

  function selectShip(DOMShip){
    selectedShip = DOMShip;
    selectedShip.classList.add("selected");
    gridInitializer.updateSelectedShip(selectedShip.id);
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

const axisBtnInitializer = (() => {
  function initAxisBtn(){
    const btn = document.getElementById("toggle-axis");
    btn.addEventListener("click", () => {
      const newAxis = gridInitializer.getAxis() === "VERT" ? "HOR" : "VERT";
      const newText = newAxis === "HOR" ? "X ➞" : "Y ↓";
      gridInitializer.updateAxis(newAxis);
      btn.textContent = newText;
    });
  }
  return {initAxisBtn};
})();

const doneBtnInitializer = (() => {
  async function initDoneBtn(){
    const btn = document.getElementById("done");
    return new Promise(resolve => {
      btn.addEventListener("click", () => {
        resolve();
      })
    }) 
  }
  return {initDoneBtn};
})();

const shipPlacementInitializer = (() => {
  async function initShipPlaceScreen(player){
    gridInitializer.initGrid(player);
    shipInitializer.initShips();
    axisBtnInitializer.initAxisBtn();
    await doneBtnInitializer.initDoneBtn();
  }
  return {initShipPlaceScreen};
})();

const shipPlaceScreenLoader = (() => {
  async function load(player){
    shipPlacementDisplayer.display(player);
    await shipPlacementInitializer.initShipPlaceScreen(player);
  }
  return {load};
})();

export default shipPlaceScreenLoader;