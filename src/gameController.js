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

        this.player1.placeFleet(this.grid1);
        this.player2.placeFleet(this.grid2);
    },

    endGame(winner){
        // TODO: Command displayController to show the end screen with the result
        return winner;
    },

    playGame(){
        let playerToAttack = this.player1;
        let gridToAttack = this.grid1;
        let attack;
        while (!playerToAttack.fleetDestroyed()){
            attack = playerToAttack.chooseAttack(gridToAttack);
            // TODO: Command displayController to show the attack
            playerToAttack.attack(gridToAttack, attack[0], attack[1]);
            
            playerToAttack = playerToAttack === this.player1 ? this.player2 : this.player1;
            gridToAttack = gridToAttack === this.grid1 ? this.grid2 : this.grid1; 
        }

        this.endGame(playerToAttack);
    },
}

export default gameController;