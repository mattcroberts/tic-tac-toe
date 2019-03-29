import * as typeorm from "typeorm";
import * as db from "./db";

describe("db util", () => {
    jest.useFakeTimers();
    it("should connect to database", async () => {
        jest.spyOn(typeorm, "createConnection").mockResolvedValue(
            undefined as any
        );
        await db.connectWithRetry();

        expect(typeorm.createConnection).toHaveBeenCalledTimes(1);
    });

    it("should retry db connection on failure", async () => {
        jest.spyOn(typeorm, "createConnection").mockRejectedValue(
            new Error("test-error")
        );
        await db.connectWithRetry(5, 0);
        jest.runAllTimers();
        jest.runAllTimers();
        jest.runAllTimers();

        expect(typeorm.createConnection).toHaveBeenCalledTimes(2);
    });
});
