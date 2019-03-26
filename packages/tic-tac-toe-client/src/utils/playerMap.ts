import { Symbol as ISymbol } from "../../typings/types";

const playerMap = {
    [ISymbol.NAUGHT]: "o",
    [ISymbol.CROSS]: "x"
};

const getPlayerSymbol = (player: ISymbol) => playerMap[player];

export default getPlayerSymbol;
