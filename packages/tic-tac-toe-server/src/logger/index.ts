import bunyan, { stdSerializers } from "bunyan";

const logger = bunyan.createLogger({
    name: "tictactoe",
    serializers: stdSerializers
});

export default logger;
