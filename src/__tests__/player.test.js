import Player from "../player";

describe("Test instantiation", () => {
    test("The player has a fleet of 5 ships. A carrier (5), battleship (4), cruiser (3), submarine (3), destroyer (2)", () => {
        const player = new Player();

        expect(Object.keys(player.fleet)).toEqual(["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]);
        expect(player.fleet.Carrier.length).toBe(5);
        expect(player.fleet.Battleship.length).toBe(4);
        expect(player.fleet.Cruiser.length).toBe(3);
        expect(player.fleet.Submarine.length).toBe(3);
        expect(player.fleet.Destroyer.length).toBe(2);
    })
})

describe("Test fleetDestroyed method", () => {
    test("Return true if fleet is destroyed, false otherwise", () => {
        const player = new Player();

        player.fleet.Carrier.health = 0;
        player.fleet.Battleship.health = 0;
        player.fleet.Cruiser.health = 0;
        player.fleet.Submarine.health = 0;
        player.fleet.Destroyer.health = 0;

        expect(player.fleetDestroyed()).toBeTruthy();

        player.fleet.Carrier.health = 5;

        expect(player.fleetDestroyed()).toBeFalsy();
    })
})