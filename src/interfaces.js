// Module that provides functions for displaying the variosu game screens

const content = document.querySelector("main");

function displayStartScreen() {}

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

function displayBattleScreen() {}

function displayEndScreen() {}

export default function displayScreen(screenName) {
  // Clear the page
  content.innerHTML = "";

  switch (screenName) {
    case "start":
      displayStartScreen();
      break;
    case "ship-placement":
      displayShipPlaceScreen();
      break;
    case "battle":
      displayBattleScreen();
      break;
    case "end":
      displayEndScreen();
      break;
    default:
      throw new Error(
        "Argument must be <start>, <ship-placement>, <battle>, or <end>"
      );
  }
}
