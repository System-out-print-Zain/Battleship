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
      document.body.replaceWith(document.body.cloneNode(true));
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

  export default shipPlacementDisplayer;
  