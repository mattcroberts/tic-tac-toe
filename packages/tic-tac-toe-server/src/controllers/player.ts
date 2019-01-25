import Player from "../models/Player";

export const findById = async (id: string) => await Player.findOneOrFail(id);

export default {
    findById
};
