import Grid from "../../models/Grid";

export const findById = async (id: string) => {
    return Grid.createQueryBuilder("grid")
        .leftJoinAndSelect("grid.players", "players")
        .leftJoinAndSelect("grid.currentPlayer", "currentPlayer")
        .leftJoinAndSelect("grid.winner", "winner")
        .leftJoinAndSelect("grid._gridItems", "_gridItems")
        .orderBy("_gridItems.x", "ASC")
        .addOrderBy("_gridItems.y", "ASC")
        .leftJoinAndSelect("_gridItems.player", "gridItemPlayers")
        .where({
            id
        })
        .getOne();
};

export default {
    findById
};
