
import Ship from "../ship";

describe("Test instantiation", () => {
    test("health property is equal to length property", () => {
        const ship = new Ship(3);

        expect(ship.length).toBe(3);
        expect(ship.health).toBe(3);
    })
})

describe("Test hit method", () => {
    test("Ship's health decreases by one when hit when it has positive health", () => {
        const ship = new Ship(4);
        ship.hit();
        expect(ship.health).toBe(3);
        expect(ship.length).toBe(4);
    })

    test("Ship's health does not decrease if it is at 0", () => {
        const ship = new Ship(1);
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.health).toBe(0);
    })
})

describe("Test destroyed method", () => {
    test("Return true if ship health is 0", () => {
        const ship = new Ship(1);
        ship.health = 0;
        expect(ship.destroyed).toBeTruthy();
    })
})