import Player from "../player";

describe("Test instantiation", () => {
    test("The player has a fleet of 5 ships of length 1 to 5", () => {
        const player = new Player();

        expect(player.fleet.length).toBe(5);
    })
})