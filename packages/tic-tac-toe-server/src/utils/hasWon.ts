import { IGridModel } from "../models/Grid";
import { IGridItem } from "../models/GridItem";
import Player from "../models/Player";

export default (player: Player, grid: IGridModel): boolean => {
    const rowWin = grid.gridItems.reduce((won, row) => {
        return (
            won ||
            row.every(({ player: p }) => {
                return p === player;
            })
        );
    }, false);

    let colWin = false;
    const forwardDiag: IGridItem[] = [];
    const backwardDiag: IGridItem[] = [];
    for (let i = 0; i < grid.gridItems.length; i++) {
        const col: IGridItem[] = [];
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

    // console.log({ rowWin, colWin, forwardDiagWin, backwardDiagWin });

    return rowWin || colWin || forwardDiagWin || backwardDiagWin;
};
