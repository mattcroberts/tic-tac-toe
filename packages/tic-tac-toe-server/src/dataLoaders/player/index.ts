import Player from "../../models/Player";

export const findById = async (id: string) => Player.findOneOrFail(id);

export default {
    findById
};
