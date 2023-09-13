
export default class Ship {
    constructor(length){
        this.length = length;
        this.health = length;
    }

    hit(){
        if (this.health > 0){
            this.health -= 1;
        }
    }

    destroyed(){
        return this.health === 0;
    }
}