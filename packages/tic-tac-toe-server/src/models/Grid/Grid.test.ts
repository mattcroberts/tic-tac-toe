import Grid from ".";
import hasWon from "../../utils/hasWon";
import Player, { ISymbol, IPlayerType } from "../Player";
import { newGrid } from "../../../test/utils";

jest.mock("../../utils/hasWon");

describe("Grid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("checkWinner", () => {
        it("should call hasWon", () => {
            (hasWon as jest.Mock).mockReturnValue(false);
            const grid = new Grid();
            grid._gridItems = newGrid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];

            grid.checkWinner();

            expect(hasWon).toHaveBeenCalledTimes(2);
            expect(hasWon).toHaveBeenNthCalledWith(
                1,
                grid.players[0],
                expect.any(Object)
            );

            expect(hasWon).toHaveBeenNthCalledWith(
                2,
                grid.players[1],
                expect.any(Object)
            );
        });

        it("should set winner if there is one 0", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(true);
            const grid = new Grid();
            grid._gridItems = newGrid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];
            grid.currentPlayer = grid.players[0];

            grid.placePlayer(grid.players[0], 0, 0);
            grid.placePlayer(grid.players[0], 0, 1);
            grid.placePlayer(grid.players[0], 0, 2);

            expect(grid.winner).toEqual(grid.players[0]);
            expect(grid.isFinished).toEqual(true);
        });

        it("should set winner if there is one X", () => {
            (hasWon as jest.Mock).mockReturnValueOnce(false);
            (hasWon as jest.Mock).mockReturnValueOnce(true);

            const grid = new Grid();
            grid._gridItems = newGrid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];
            grid.currentPlayer = grid.players[0];

            grid.placePlayer(grid.players[1], 0, 0);
            grid.placePlayer(grid.players[1], 0, 1);
            grid.placePlayer(grid.players[1], 0, 2);

            expect(grid.winner).toEqual(grid.players[1]);
            expect(grid.isFinished).toEqual(true);
        });
    });

    describe("placePlayer", () => {
        beforeEach(() => {
            (hasWon as jest.Mock).mockReturnValue(false);
        });

        it("should set player property", () => {
            const grid = new Grid();
            grid._gridItems = newGrid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];
            grid.currentPlayer = grid.players[0];

            grid.placePlayer(grid.players[0], 0, 1);

            expect(grid._gridItems[1].player).toHaveProperty(
                "symbol",
                ISymbol.NAUGHT
            );
        });

        it("should alternate players", () => {
            const grid = new Grid();
            grid._gridItems = newGrid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];
            grid.currentPlayer = grid.players[0];

            grid.placePlayer(grid.players[0], 0, 1);

            expect(grid.currentPlayer.symbol).toEqual(ISymbol.CROSS);

            grid.placePlayer(grid.players[1], 0, 0);
            expect(grid.currentPlayer.symbol).toEqual(ISymbol.NAUGHT);
        });
    });
});
