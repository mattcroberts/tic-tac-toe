import { Symbol as ISymbol } from "../../typings/types";

const playerMap = {
    [ISymbol.NAUGHT]: "0",
    [ISymbol.CROSS]: "X"
};

const getPlayerSymbol = (player: ISymbol) => playerMap[player];

export default getPlayerSymbol;
