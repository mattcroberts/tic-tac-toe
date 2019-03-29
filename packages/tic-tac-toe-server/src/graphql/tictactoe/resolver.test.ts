import { Query } from "./resolver";
import Grid from "../../models/Grid";

describe("TicTacToe resolver", () => {
    const mockQueryBuilder = {
        leftJoin: jest.fn().mockReturnThis(),
        getCount: jest.fn(),
        where: jest.fn().mockReturnThis()
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("query", () => {
        it("should lookup game stats", async () => {
            jest.spyOn(Grid, "count")
                .mockResolvedValueOnce(2)
                .mockResolvedValueOnce(3)
                .mockResolvedValue(4);
            jest.spyOn(Grid, "createQueryBuilder").mockReturnValue(
                mockQueryBuilder as any
            );
            mockQueryBuilder.getCount.mockReturnValue(5);
            const result = await Query.tictactoe();

            expect(result).toEqual({
                crossWins: 5,
                gamesDrawn: 4,
                gamesFinished: 3,
                gamesInProgress: 2,
                naughtWins: 5
            });
        });
    });
});
