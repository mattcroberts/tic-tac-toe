import gridDataLoader from ".";
import Grid from "../../models/Grid";

describe("Grid Data Loader", () => {
    const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn()
    };
    beforeEach(() => {
        const grid = new Grid();
        grid.id = "123";
        Grid.createQueryBuilder = jest.fn().mockReturnValue(mockQueryBuilder);
        mockQueryBuilder.getOne.mockReturnValue(grid);
    });

    it("should find objects by id", async () => {
        const grid = await gridDataLoader.findById("123");

        expect(grid).toBeInstanceOf(Grid);
        expect(grid!.id).toEqual("123");
    });
});
