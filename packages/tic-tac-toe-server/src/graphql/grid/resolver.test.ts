import { query, mutation } from "./resolver";
import Grid from "../../models/Grid";
import GridController from "../../controllers/grid";
import PlayerController from "../../controllers/player";
import Player, { ISymbol, IPlayerType } from "../../models/Player";

describe("Grid resolver", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("query", () => {
        it("should lookup grid by id if provided", async () => {
            const testGrid = new Grid();
            testGrid.id = "123";

            const spy = jest
                .spyOn(GridController, "findById")
                .mockReturnValueOnce(testGrid);

            const grid = await query.Query.grid(undefined, { id: "123" });

            expect(grid.id).toEqual(testGrid.id);
            expect(spy).toHaveBeenCalledWith("123");
        });

        it("should throw if no id is provided", () => {
            jest.spyOn(GridController, "findById").mockRejectedValue(
                new Error("No Id Provided")
            );
            const params: any = { id: undefined };
            return expect(query.Query.grid(undefined, params)).rejects.toEqual(
                new Error("No Id Provided")
            );
        });
    });

    describe("executeTurn", () => {
        it("should call placePlayer", async () => {
            const testGrid = new Grid();
            const testPlayer = new Player(
                ISymbol.NAUGHT,
                IPlayerType.ANONYMOUS
            );

            testGrid.currentPlayer = testPlayer;

            const placePlayerSpy = jest
                .spyOn(testGrid, "placePlayer")
                .mockReturnValue(undefined);

            jest.spyOn(testGrid, "save").mockImplementation(() =>
                Promise.resolve()
            );

            jest.spyOn(GridController, "findById").mockResolvedValueOnce(
                testGrid
            );

            jest.spyOn(PlayerController, "findById").mockResolvedValueOnce(
                testPlayer
            );
            const params: any = {
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            await mutation.Mutation.executeTurn(undefined, params);

            expect(placePlayerSpy).toHaveBeenCalled();
            expect(placePlayerSpy).toHaveBeenCalledWith(testPlayer, 1, 2);
        });

        it("should throw if grid not found", async () => {
            jest.spyOn(GridController, "findById").mockReturnValue(undefined);

            const params: any = {
                id: "123",
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            expect(
                mutation.Mutation.executeTurn(undefined, params)
            ).rejects.toEqual(new Error("Execute Turn Error grid:123"));
        });
    });

    describe("newGame", () => {
        it("should create a new grid", async () => {
            jest.spyOn(Player.prototype, "save").mockResolvedValue(
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS)
            );
            const mockGrid = new Grid();
            const saveSpy = jest
                .spyOn(Grid.prototype, "save")
                .mockResolvedValue(mockGrid);

            const newGrid = await mutation.Mutation.newGame();

            expect(saveSpy).toHaveBeenCalled();

            expect(newGrid).toBeInstanceOf(Grid);
        });
    });
});
