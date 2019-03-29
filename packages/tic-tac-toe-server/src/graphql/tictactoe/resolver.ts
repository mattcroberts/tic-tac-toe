import Grid from "../../models/Grid";
import { ISymbol } from "../../models/Player";

export const Query = {
    async tictactoe() {
        const gamesInProgress = await Grid.count({
            isFinished: false
        });
        const gamesFinished = await Grid.count({
            isFinished: true
        });

        const crossWins = await Grid.createQueryBuilder("grid")
            .leftJoin("grid.winner", "winner")
            .where(`winner.symbol = '${ISymbol.CROSS}'`)
            .getCount();

        const naughtWins = await Grid.createQueryBuilder("grid")
            .leftJoin("grid.winner", "winner")
            .where(`winner.symbol = '${ISymbol.NAUGHT}'`)
            .getCount();

        const gamesDrawn = await Grid.count({
            isFinished: true,
            winner: null
        });

        return {
            gamesInProgress,
            gamesFinished,
            crossWins,
            naughtWins,
            gamesDrawn
        };
    }
};
