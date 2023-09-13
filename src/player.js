import Ship from "./ship";

export default class Player {
    constructor(){
        this.fleet = [];
        for (let i = 1; i <= 5; i ++){
            this.fleet.push(new Ship(i));
        }
    }
}