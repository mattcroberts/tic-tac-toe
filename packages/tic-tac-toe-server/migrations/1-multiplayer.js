"use strict";

module.exports.id = "MULTIPLAYER";

const Player = require("../build/models/Player").default;
const Grid = require("../build/models/Grid").default;

const createPlayers = () => {
    const NAUGHT = new Player({
        symbol: "NAUGHT"
    });

    const CROSS = new Player({
        symbol: "CROSS"
    });

    NAUGHT.save().then(naught => {
        // this.log(naught);
        return naught;
    });

    CROSS.save().then(cross => {
        // this.log(cross);
        return cross;
    });

    return Promise.all([NAUGHT, CROSS]).then(players => {
        console.log({ players });
        return players;
    });
};

module.exports.up = function(done) {
    this.db
        .collection("grids")
        .find({})
        .toArray((err, grids) => {
            const newGrids = grids.map(grid => {
                return new Grid({
                    isFinished: grid.isFinished,
                    size: grid.size
                }).save();
            });

            Promise.all(newGrids)
                .then(newGrids => {
                    newGrids = newGrids.map((newGrid, i) => {
                        const grid = grids[i];

                        newGrid.currentPlayer =
                            grid.currentPlayer === "NAUGHT"
                                ? newGrid.players[0]
                                : newGrid.players[1];

                        if (grid.winner) {
                            newGrid["winner"] =
                                grid.winner === "NAUGHT"
                                    ? newGrid.players[0]
                                    : newGrid.players[1];
                        }

                        grid._gridItems.forEach((item, i) => {
                            newGrid._gridItems[i].set("player", item.player);
                            console.log(newGrid._gridItems[i]);
                        });
                        newGrid.markModified("_gridItems");

                        console.log("gridItems", grid._gridItems);
                        let prom = Promise.resolve();
                        if (newGrid.winner) {
                            prom = newGrid.winner.save();
                        }
                        return prom.then(() => newGrid.save());
                    });

                    Promise.all(newGrids).then(() => {
                        done();
                    });
                })
                .catch(done);
        });
};

module.exports.down = function(done) {
    // use this.db for MongoDB communication, and this.log() for logging
    done();
};
