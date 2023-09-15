
export default class Ship {
    constructor(name, length){
        this.length = length;
        this.health = length;
        this.name = name;
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