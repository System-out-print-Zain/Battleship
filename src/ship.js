
export default class Ship {
    constructor(length){
        this.length = length;
        this.health = length;
    }

    hit(){
        this.health -= 1;
    }

    destroyed(){
        return this.health === 0;
    }
}