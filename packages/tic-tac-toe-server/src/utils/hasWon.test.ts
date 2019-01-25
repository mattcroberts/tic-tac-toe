import hasWon from "./hasWon";
import Player, { ISymbol, IPlayerType } from "../models/Player";
import Grid from "../models/Grid";
import { newGrid } from "../../test/utils";

describe("hasWon", () => {
    const naughtPlayer = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);

    it("should detect horizontal wins 1", () => {
        const gridItems = newGrid();
        gridItems[0].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[1].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[2].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);

        const grid = new Grid();
        grid._gridItems = gridItems;
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect horizontal wins 2", () => {
        const gridItems = newGrid();
        gridItems[3].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[4].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[5].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);

        const grid = new Grid();
        grid._gridItems = gridItems;

        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect horizontal wins 3", () => {
        const gridItems = newGrid();
        gridItems[6].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[7].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);
        gridItems[8].player = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);

        const grid = new Grid();
        grid._gridItems = gridItems;
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect vertical wins 1", () => {
        const grid = new Grid();
        grid._gridItems = newGrid();
        grid._gridItems[0].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[3].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[6].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect vertical wins 2", () => {
        const grid = new Grid();
        grid._gridItems = newGrid();
        grid._gridItems[1].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[4].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[7].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect vertical wins 3", () => {
        const grid = new Grid();
        grid._gridItems = newGrid();
        grid._gridItems[2].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[5].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[8].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect forward diag win", () => {
        const grid = new Grid();
        grid._gridItems = newGrid();
        grid._gridItems[0].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[4].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[8].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });

    it("should detect backward diag win", () => {
        const grid = new Grid();
        grid._gridItems = newGrid();
        grid._gridItems[2].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[4].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        grid._gridItems[6].player = new Player(
            ISymbol.NAUGHT,
            IPlayerType.ANONYMOUS
        );
        const result = hasWon(naughtPlayer, grid);

        expect(result).toBe(true);
    });
});
