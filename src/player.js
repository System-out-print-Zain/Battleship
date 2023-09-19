import Ship from "./ship";
import Grid from "./grid";

export default class Player {
    static #genFleet(){
        return {
            "Carrier": new Ship("Carrier", 5),
            "Battleship": new Ship("Battleship", 4),
            "Cruiser": new Ship("Cruiser", 3),
            "Submarine": new Ship("Submarine", 3),
            "Destroyer": new Ship("Destroyer", 2),
        }
    }

    constructor(name){
        this.name = name;
        this.grid = new Grid();
        this.fleet = Player.#genFleet();
    }

    getShips(){
        return [this.fleet.Carrier, this.fleet.Battleship, this.fleet.Cruiser, this.fleet.Submarine, this.fleet.Destroyer];
    }

    fleetDestroyed(){
        let destroyed = true
        const ships = Object.values(this.fleet);
        ships.forEach((ship) => {
            if (!ship.destroyed()){
                destroyed = false;
            }
        })
        return destroyed;
    }

    gridCellEmpty(cellX, cellY){
        return this.grid.cellEmpty(cellX, cellY);
    }

    shipPlaced(shipName){
        return this.grid.shipPlaced(this.fleet[shipName]);
    }

    placeShip(shipName, startCellX, startCellY, direction){
        if (!this.shipPlaced(this.fleet[shipName])){
            this.grid.placeShip(this.fleet[shipName], startCellX, startCellY, direction);
        }else{
            throw Error(`The ${shipName} has already been placed`);
        }
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