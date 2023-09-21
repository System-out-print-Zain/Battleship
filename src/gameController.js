import { Player, CPUPlayer } from "./player";
import displayController from "./displayController";

const gameController = (() => {
    let player1;
    let player2;

    async function setupGame(player1Type, name1, player2Type, name2){
        player1 = player1Type === "usr" ? new Player(name1) : new CPUPlayer(name1);
        player2 = player2Type === "usr" ? new Player(name2) : new CPUPlayer(name2);

        if (player1 instanceof CPUPlayer){
            player1.placeFleet();
        }
        else{
            await displayController.loadShipPlaceScreen(player1);
        }

        if (player2 instanceof CPUPlayer){
            player2.placeFleet();
        }
        else{
            await displayController.loadShipPlaceScreen(player2);
        }
    }

    return {setupGame};
})();

export default gameController;