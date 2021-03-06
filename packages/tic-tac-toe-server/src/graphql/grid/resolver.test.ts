import { Query, Mutation } from "./resolver";
import Grid from "../../models/Grid";
import gridDataLoader from "../../dataLoaders/grid";
import playerDataLoader from "../../dataLoaders/player";
import Player, { ISymbol, IPlayerType } from "../../models/Player";
import pubsub from "../pubsub";

jest.mock("../pubsub");

describe("Grid resolver", () => {
    (pubsub.publish as jest.Mock).mockResolvedValue(undefined);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("query", () => {
        it("should lookup grid by id if provided", async () => {
            const testGrid = new Grid();
            testGrid.id = "123";

            const spy = jest
                .spyOn(gridDataLoader, "findById")
                .mockResolvedValueOnce(testGrid);

            const grid = await Query.grid(undefined, { id: "123" });

            expect(grid.id).toEqual(testGrid.id);
            expect(spy).toHaveBeenCalledWith("123");
        });

        it("should throw if no id is provided", () => {
            jest.spyOn(gridDataLoader, "findById").mockRejectedValue(
                new Error("No Id Provided")
            );
            const params: any = { id: undefined };
            return expect(Query.grid(undefined, params)).rejects.toEqual(
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

            jest.spyOn(testGrid, "save").mockResolvedValueOnce(testGrid);

            jest.spyOn(gridDataLoader, "findById").mockResolvedValueOnce(
                testGrid
            );

            jest.spyOn(playerDataLoader, "findById").mockResolvedValueOnce(
                testPlayer
            );
            const params: any = {
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            await Mutation.executeTurn(undefined, params);

            expect(placePlayerSpy).toHaveBeenCalled();
            expect(placePlayerSpy).toHaveBeenCalledWith(testPlayer, 1, 2);
        });

        it("should throw if grid not found", async () => {
            jest.spyOn(gridDataLoader, "findById").mockResolvedValue(undefined);

            const params: any = {
                id: "123",
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            expect(Mutation.executeTurn(undefined, params)).rejects.toEqual(
                new Error("Execute Turn Error grid:123")
            );
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

            const newGrid = await Mutation.newGame();

            expect(saveSpy).toHaveBeenCalled();

            expect(newGrid).toBeInstanceOf(Grid);
        });
    });
});
