// Module that provides functions for displaying the variosu game screens

function displayStartScreen() {}

function displayShipPlaceScreen() {}

function displayBattleScreen() {}

function displayEndScreen() {}

export default function displayScreen(screenName) {
  // Clear the page
  document.body.innerHTML = "";

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
