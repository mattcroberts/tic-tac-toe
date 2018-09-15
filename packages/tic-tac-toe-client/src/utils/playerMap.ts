import { Player } from "../../typings/types";

const playerMap = {
    [Player.NAUGHT]: "0",
    [Player.CROSS]: "X"
};

const getPlayerSymbol = (player: Player) => playerMap[player];

export default getPlayerSymbol;
