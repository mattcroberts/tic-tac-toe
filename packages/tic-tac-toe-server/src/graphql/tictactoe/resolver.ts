import Grid from "../../models/Grid";
import { ISymbol } from "../../models/Player";

export const query = {
    Query: {
        async tictactoe() {
            // const gamesInProgress = await Grid.countDocuments({
            //     isFinished: false
            // });
            // const gamesFinished = await Grid.countDocuments({
            //     isFinished: true
            // });
            // const gridsWithWinners = await Grid.find().populate("winner");
            // const crossWins = gridsWithWinners.filter(
            //     grid => grid.winner && grid.winner.symbol === ISymbol.CROSS
            // ).length;
            // const naughtWins = gridsWithWinners.filter(
            //     grid => grid.winner && grid.winner.symbol === ISymbol.NAUGHT
            // ).length;
            // const gamesDrawn = await Grid.countDocuments({
            //     winner: null,
            //     isFinished: true
            // });
            // return {
            //     gamesInProgress,
            //     gamesFinished,
            //     crossWins,
            //     naughtWins,
            //     gamesDrawn
            // };
        }
    }
};
