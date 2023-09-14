import Ship from "./ship";

export default class Player {
    constructor(name){
        this.name = name;
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

    static attack(grid, cellX, cellY){
        if (!grid.cellAttacked()){
            grid.markAttack(cellX, cellY);
        }
        else{
            throw Error("This square has already been attacked");
        }
    }
}

export class HumanPlayer extends Player {
    constructor(name){
        super().constructor(name);
    }

    static chooseAttack(grid){
        // TODO: Command displayController to get input from user.
    }
}

export class CPUPlayer extends Player {
    constructor(name){
        super().constructor(name);
    }

    static chooseAttack(grid){
        const choices = grid.getEmptyCells();
        const randIndex = Math.floor(choices.length * Math.random())

        return choices[randIndex];
    }
}