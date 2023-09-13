import Ship from "./ship";

export default class Player {
    constructor(){
        this.fleet = [];
        for (let i = 1; i <= 5; i ++){
            this.fleet.push(new Ship(i));
        }
    }

    fleetDestroyed(){
        let destroyed = true
        this.fleet.forEach((ship) => {
            if (!ship.destroyed()){
                destroyed = false
            }
        })
        return destroyed;
    }
}

export class HumanPlayer extends Player {
    constructor(){
        super().constructor();
    }

    attack(grid){
        // TODO: Command displayController to get input from user.
    }
}

export class CPUPlayer extends Player {
    constructor(){
        super().constructor();
    }

    attack(grid){
        // TODO: Run algorithm to choose cell to attack
    }
}