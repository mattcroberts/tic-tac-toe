import main from "./main";
import http from "http";
import { connectWithRetry } from "./db";
jest.mock("http");
jest.mock("./db");
describe("main", () => {
    beforeEach(() => {
        (connectWithRetry as jest.Mock).mockResolvedValue(undefined);
    });
    it("should listen", async () => {
        await main();

        expect(http.createServer).toBeCalledWith(expect.any(Function));
        const server = (http.createServer as jest.Mock).mock.results[0].value;

        expect(server.listen).toBeCalledWith(3000, expect.anything());
    });

    it("should connect to DB", () => {
        expect(connectWithRetry).toHaveBeenCalled();
    });
});
