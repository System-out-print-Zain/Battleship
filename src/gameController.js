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

    endGame(winner){
        // TODO: Command displayController to show the end screen with the result
        return winner;
    },

    playGame(){
        let turn = this.player1;
        let gridToAttack = this.grid1;
        while (!turn.fleetDestroyed()){
            turn.attack(gridToAttack);
            turn = turn === this.player1 ? this.player2 : this.player1;
            gridToAttack = gridToAttack === this.grid1 ? this.grid2 : this.grid1; 
        }

        this.endGame(turn);
    },
}

export default gameController;