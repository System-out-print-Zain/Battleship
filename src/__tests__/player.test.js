import Player from "../player";

describe("Test instantiation", () => {
    test("The player has a fleet of 5 ships of length 1 to 5", () => {
        const player = new Player();

        expect(player.fleet.length).toBe(5);
    })
})

describe("Test fleetDestroyed method", () => {
    test("Return true if fleet is destroyed, false otherwise", () => {
        const player = new Player();

        for (let i = 0; i < player.fleet.length; i++)
        {
            player.fleet[i].health = 0;
        }

        expect(player.fleetDestroyed()).toBeTruthy();

        player.fleet[0].health = 5;

        expect(player.fleetDestroyed()).toBeFalsy();
    })
})