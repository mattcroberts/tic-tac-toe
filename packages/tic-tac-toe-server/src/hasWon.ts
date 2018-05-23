import Grid from "./models/Grid";
import GridItem from "./models/GridItem";
import Player from "./models/Player";

export const hasWon = (player: Player, grid: Grid): boolean => {
    const rowWin = grid.gridItems.reduce((won, row, i, all) => {
        return (
            won ||
            row.every(({ player: p }, j) => {
                return p === player;
            })
        );
    }, false);

    let colWin = false;
    const forwardDiag: GridItem[] = [];
    const backwardDiag: GridItem[] = [];
    for (let i = 0; i < grid.gridItems.length; i++) {
        const col: GridItem[] = [];
        forwardDiag.push(grid.gridItems[i][i]);
        backwardDiag.push(grid.gridItems[i][grid.gridItems.length - i - 1]);

        for (let j = 0; j < grid.gridItems[i].length; j++) {
            col.push(grid.gridItems[j][i]);
        }

        colWin =
            col[0].player === player &&
            col.every(({ player: p }) => {
                return p === col[0].player;
            });

        if (colWin) {
            break;
        }
    }

    const forwardDiagWin =
        forwardDiag[0].player === player &&
        forwardDiag.every(({ player: p }) => {
            return p === forwardDiag[0].player;
        });

    const backwardDiagWin =
        backwardDiag[0].player === player &&
        backwardDiag.every(({ player: p }) => {
            return p === backwardDiag[0].player;
        });

    return rowWin || colWin || forwardDiagWin || backwardDiagWin;
};
