import Grid from ".";
import hasWon from "../../hasWon";
import Player from "../Player";

jest.mock("../../hasWon");

describe("Grid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("checkWinner", () => {
        it("should call hasWon", () => {
            hasWon.mockReturnValue(false);
            const grid = new Grid();

            grid.checkWinner();

            expect(hasWon).toHaveBeenCalledTimes(2);
            expect(hasWon).toHaveBeenNthCalledWith(
                1,
                Player.NAUGHT,
                expect.any(Object)
            );
            expect(hasWon).toHaveBeenNthCalledWith(
                2,
                Player.CROSS,
                expect.any(Object)
            );
        });

        it("should set winner if there is one", () => {
            hasWon.mockReturnValueOnce(true);
            const grid = new Grid();

            grid.placePlayer(Player.NAUGHT, 0, 0);
            grid.placePlayer(Player.NAUGHT, 0, 1);
            grid.placePlayer(Player.NAUGHT, 0, 2);

            expect(grid.winner).toEqual(Player.NAUGHT);
            expect(grid.isFinished).toEqual(true);
        });

        it("should set winner if there is one", () => {
            hasWon.mockReturnValueOnce(false);
            hasWon.mockReturnValueOnce(true);

            const grid = new Grid();

            grid.placePlayer(Player.CROSS, 0, 0);
            grid.placePlayer(Player.CROSS, 0, 1);
            grid.placePlayer(Player.CROSS, 0, 2);

            expect(grid.winner).toEqual(Player.CROSS);
            expect(grid.isFinished).toEqual(true);
        });
    });

    describe("placePlayer", () => {
        beforeEach(() => {
            hasWon.mockReturnValue(false);
        });

        it("should set player property", () => {
            const grid = new Grid();

            grid.placePlayer(Player.NAUGHT, 0, 1);

            expect(grid._gridItems[1]).toHaveProperty("player", Player.NAUGHT);
        });

        it("should alternate players", () => {
            const grid = new Grid();

            grid.placePlayer(Player.NAUGHT, 0, 1);

            expect(grid.currentPlayer).toEqual(Player.CROSS);

            grid.placePlayer(Player.CROSS, 0, 0);
            expect(grid.currentPlayer).toEqual(Player.NAUGHT);
        });
    });
});
