import Grid from ".";
import hasWon from "../../utils/hasWon";
import { ISymbol } from "../Player";

jest.mock("../../utils/hasWon");

describe("Grid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("checkWinner", () => {
        it("should call hasWon", () => {
            (hasWon as jest.Mock).mockReturnValue(false);
            const grid = new Grid();

            grid.checkWinner();

            expect(hasWon).toHaveBeenCalledTimes(2);
            expect(hasWon).toHaveBeenNthCalledWith(
                1,
                ISymbol.NAUGHT,
                expect.any(Object)
            );
            expect(hasWon).toHaveBeenNthCalledWith(
                2,
                ISymbol.CROSS,
                expect.any(Object)
            );
        });

        it("should set winner if there is one", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(true);
            const grid = new Grid();

            grid.placePlayer(ISymbol.NAUGHT, 0, 0);
            grid.placePlayer(ISymbol.NAUGHT, 0, 1);
            grid.placePlayer(ISymbol.NAUGHT, 0, 2);

            expect(grid.winner).toEqual(ISymbol.NAUGHT);
            expect(grid.isFinished).toEqual(true);
        });

        it("should set winner if there is one", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(false);
            (hasWon as jest.Mock).mockReturnValueOnce(true);

            const grid = new Grid();

            grid.placePlayer(ISymbol.CROSS, 0, 0);
            grid.placePlayer(ISymbol.CROSS, 0, 1);
            grid.placePlayer(ISymbol.CROSS, 0, 2);

            expect(grid.winner).toEqual(ISymbol.CROSS);
            expect(grid.isFinished).toEqual(true);
        });
    });

    describe("placePlayer", () => {
        beforeEach(() => {
            (hasWon as jest.Mock).mockReturnValue(false);
        });

        it("should set player property", () => {
            const grid = new Grid();

            grid.placePlayer(ISymbol.NAUGHT, 0, 1);

            expect(grid._gridItems[1]).toHaveProperty("player", ISymbol.NAUGHT);
        });

        it("should alternate players", () => {
            const grid = new Grid();

            grid.placePlayer(ISymbol.NAUGHT, 0, 1);

            expect(grid.currentPlayer).toEqual(ISymbol.CROSS);

            grid.placePlayer(ISymbol.CROSS, 0, 0);
            expect(grid.currentPlayer).toEqual(ISymbol.NAUGHT);
        });
    });
});
