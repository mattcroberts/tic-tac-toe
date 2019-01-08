import Grid from ".";
import hasWon from "../../utils/hasWon";
import { ISymbol } from "../Player";

jest.mock("../../utils/hasWon");

describe("Grid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe.skip("checkWinner", () => {
        it("should call hasWon", () => {
            (hasWon as jest.Mock).mockReturnValue(false);
            const grid = new Grid({
                players: [{ symbol: ISymbol.NAUGHT }, { symbol: ISymbol.CROSS }]
            });

            grid.checkWinner();

            expect(hasWon).toHaveBeenCalledTimes(2);
            expect(hasWon).toHaveBeenNthCalledWith(
                2,
                ISymbol.CROSS,
                expect.any(Object)
            );
        });

        it("should set winner if there is one", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(true);
            const grid = new Grid({
                players: [{ symbol: ISymbol.NAUGHT }, { symbol: ISymbol.CROSS }]
            });

            grid.placePlayer(ISymbol.NAUGHT, 0, 0);
            grid.placePlayer(ISymbol.NAUGHT, 0, 1);
            grid.placePlayer(ISymbol.NAUGHT, 0, 2);

            expect(grid.winner).toEqual(ISymbol.NAUGHT);
            expect(grid.isFinished).toEqual(true);
        });

        it("should set winner if there is one", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(false);
            (hasWon as jest.Mock).mockReturnValueOnce(true);

            const grid = new Grid({
                players: [{ symbol: ISymbol.NAUGHT }, { symbol: ISymbol.CROSS }]
            });

            grid.placePlayer(ISymbol.CROSS, 0, 0);
            grid.placePlayer(ISymbol.CROSS, 0, 1);
            grid.placePlayer(ISymbol.CROSS, 0, 2);

            expect(grid.winner).toEqual(ISymbol.CROSS);
            expect(grid.isFinished).toEqual(true);
        });
    });

    describe.skip("placePlayer", () => {
        beforeEach(() => {
            (hasWon as jest.Mock).mockReturnValue(false);
        });

        it("should set player property", () => {
            const grid = new Grid({
                players: [{ symbol: ISymbol.NAUGHT }, { symbol: ISymbol.CROSS }]
            });

            grid.placePlayer(ISymbol.NAUGHT, 0, 1);

            expect(grid._gridItems[1].player).toHaveProperty(
                "symbol",
                ISymbol.NAUGHT
            );
        });

        it("should alternate players", () => {
            const grid = new Grid();

            grid.placePlayer(ISymbol.NAUGHT, 0, 1);

            expect(grid.currentPlayer.symbol).toEqual(ISymbol.CROSS);

            grid.placePlayer(ISymbol.CROSS, 0, 0);
            expect(grid.currentPlayer.symbol).toEqual(ISymbol.NAUGHT);
        });
    });
});
