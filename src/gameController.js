import { Player, CPUPlayer } from "./player";
import displayController from "./displayController";

const gameController = {
    player1: null,
    player2: null,

    async setupGame(player1, name1, player2, name2){
        this.player1 = player1 === "usr" ? new Player(name1) : new CPUPlayer(name1);
        this.player2 = player2 === "usr" ? new Player(name2) : new CPUPlayer(name2);

        if (this.player1 instanceof CPUPlayer){
            this.player1.placeFleet();
        }
        else{
            await displayController.loadShipPlaceScreen(this.player1);
        }

        if (this.player2 instanceof CPUPlayer){
            this.player2.placeFleet();
        }
        else{
            await displayController.loadShipPlaceScreen(this.player2);
        }
    },

    playGame(){
        let attackingPlayer = this.player1;
        let gridToAttack = this.grid1;
        let attack;
        while (!attackingPlayer.fleetDestroyed()){
            attack = attackingPlayer.chooseAttack(gridToAttack);
            // TODO: Command displayController to show the attack
            attackingPlayer.attack(gridToAttack, attack[0], attack[1]);

            attackingPlayer = attackingPlayer === this.player1 ? this.player2 : this.player1;
            gridToAttack = gridToAttack === this.grid1 ? this.grid2 : this.grid1; 
        }

        // TODO: Command displayController to show the end screen with the result
    },
};

export default gameController;