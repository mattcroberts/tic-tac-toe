import Grid from "../../models/Grid";
// import Player, { SYMBOL } from "../../models/Player";

export const query = {
    Query: {
        async tictactoe() {
            const gamesInProgress = await Grid.countDocuments({
                isFinished: false
            });

            const gamesFinished = await Grid.countDocuments({
                isFinished: true
            });

            // const crossWins = await Grid.find({
            //     isFinished: true
            // }).then((grids) => {
            //     Player.find()
            // })

            // const naughtWins = await Grid.countDocuments({
            //     winner: { symbol: SYMBOL.NAUGHT }
            // });

            const gamesDrawn = await Grid.countDocuments({
                winner: null,
                isFinished: true
            });

            return {
                gamesInProgress,
                gamesFinished,
                crossWins: 0,
                naughtWins: 0,
                gamesDrawn
            };
        }
    }
};
