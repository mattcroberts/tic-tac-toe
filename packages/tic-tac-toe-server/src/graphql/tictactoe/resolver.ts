import Grid from "../../models/Grid";
import Player from "../../models/Player";

export const query = {
    Query: {
        async tictactoe() {
            const gamesInProgress = await Grid.countDocuments({
                isFinished: false
            });

            const gamesFinished = await Grid.countDocuments({
                isFinished: true
            });

            const crossWins = await Grid.countDocuments({
                winner: Player.CROSS
            });

            const naughtWins = await Grid.countDocuments({
                winner: Player.NAUGHT
            });

            const gamesDrawn = await Grid.countDocuments({
                winner: null,
                isFinished: true
            });

            return {
                gamesInProgress,
                gamesFinished,
                crossWins,
                naughtWins,
                gamesDrawn
            };
        }
    }
};
