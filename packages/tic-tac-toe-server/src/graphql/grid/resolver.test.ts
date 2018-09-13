import { query, mutation } from "./resolver";
import Grid from "../../models/Grid";

describe("Grid resolver", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("query", () => {
        it("should lookup grid by id if provided", async () => {
            const testGrid = new Grid();
            jest.spyOn(Grid, "findById").mockResolvedValueOnce(testGrid);
            const grid = await query.Query.grid(undefined, { id: "123" });

            expect(grid && grid.id).toEqual(testGrid.id);
        });

        it("should throw if no id is provided", () => {
            const params: any = { id: undefined };
            expect(query.Query.grid(undefined, params)).rejects.toEqual(
                new Error("No ID Provided")
            );
        });
    });

    describe("executeTurn", () => {
        it("should call placePlayer", async () => {
            const testGrid = new Grid();
            const placePlayerSpy = jest
                .spyOn(testGrid, "placePlayer")
                .mockReturnValue(undefined);

            jest.spyOn(testGrid, "save").mockImplementation(() =>
                Promise.resolve()
            );
            jest.spyOn(Grid, "findById").mockResolvedValueOnce(testGrid);
            const params: any = {
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            await mutation.Mutation.executeTurn(undefined, params);

            expect(placePlayerSpy).toHaveBeenCalled();
            expect(placePlayerSpy).toHaveBeenCalledWith("NAUGHT", 1, 2);
        });
        it("should throw if grid not found", async () => {
            const testGrid = new Grid();
            jest.spyOn(Grid, "findById").mockResolvedValueOnce(null);
            const params: any = {
                id: "123",
                player: "NAUGHT",
                x: 1,
                y: 2
            };
            expect(
                mutation.Mutation.executeTurn(undefined, params)
            ).rejects.toEqual(new Error("Grid not found:123"));
        });
    });

    describe("newGame", () => {
        it("should create a new grid", async () => {
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
