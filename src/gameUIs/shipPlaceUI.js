const content = document.querySelector("main");

function displayShipPlaceScreen() {
  content.innerHTML = 
  `<div id="grid"></div>
  <div id="ships"></div>`;

  // Generate grid

  const grid = document.getElementById("grid");

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


}