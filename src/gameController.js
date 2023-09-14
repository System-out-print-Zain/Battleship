import { HumanPlayer, CPUPlayer } from "./player";
import Grid from "./grid";

const gameController = {
    player1: null,
    player2: null,
    grid1: null,
    grid2: null,

    setupGame(player1, name1, player2, name2){
        this.player1 = player1 === "usr" ? new HumanPlayer(name1) : new CPUPlayer(name1);
        this.player2 = player2 === "usr" ? new HumanPlayer(name2) : new CPUPlayer(name2);

        this.grid1 = new Grid();
        this.grid2 = new Grid();

        this.player1.placeFleet();
        this.player2.placeFleet();
    },
}

export default gameController;