const http = jest.genMockFromModule("http") as any;

const server = {
    listen: jest.fn(),
    on: jest.fn()
};
const createServer = jest.fn().mockReturnValue(server);

http.createServer = createServer;

export { createServer };
export default http;
