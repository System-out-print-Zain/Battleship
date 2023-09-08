const content = document.querySelector("main");

export default function displayShipPlaceScreen() {
  // Generate grid
  const grid = document.createElement("div");
  grid.id = "grid";

  content.appendChild(grid);

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

  // Show ships 
  const ships = document.createElement("div");
  ships.id = "ships";
  content.appendChild(ships);

}