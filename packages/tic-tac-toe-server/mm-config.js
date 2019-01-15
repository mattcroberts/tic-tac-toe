const mongoose = require("mongoose");

mongoose.connect(
    "<MONGO_CONNECTION_STRING>",
    {
        autoReconnect: true,
        reconnectInterval: 5
    }
);

module.exports = {
    host: "localhost",
    port: 27017,
    db: "live"
};
