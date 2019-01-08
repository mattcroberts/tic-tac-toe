import { IGridModel } from "../models/Grid";
import { IGridItemModel } from "../models/GridItem";
import { IPlayerModel } from "../models/Player";

const checkLine = (
    playerToCheck: IPlayerModel,
    line: IGridItemModel[]
): boolean => {
    const linePlayer = line[0].player;
    return (
        !!linePlayer &&
        linePlayer === playerToCheck.symbol &&
        line.every(({ player: p }) => {
            return !!p && p === linePlayer;
        })
    );
};

export default (player: IPlayerModel, grid: IGridModel): boolean => {
    const rowWin = grid.gridItems.reduce((won, row) => {
        return (
            won ||
            row.every(({ player: p }) => {
                return p ? p === player.symbol : false;
            })
        );
    }, false);

    let colWin = false;
    const forwardDiag: IGridItemModel[] = [];
    const backwardDiag: IGridItemModel[] = [];
    for (let i = 0; i < grid.gridItems.length; i++) {
        const col: IGridItemModel[] = [];
        forwardDiag.push(grid.gridItems[i][i]);
        backwardDiag.push(grid.gridItems[i][grid.gridItems.length - i - 1]);

        for (let j = 0; j < grid.gridItems[i].length; j++) {
            col.push(grid.gridItems[j][i]);
        }

        colWin = checkLine(player, col);

        if (colWin) {
            break;
        }
    }

    const forwardDiagWin = checkLine(player, forwardDiag);
    const backwardDiagWin = checkLine(player, backwardDiag);

    // console.log({ rowWin, colWin, forwardDiagWin, backwardDiagWin });

    return rowWin || colWin || forwardDiagWin || backwardDiagWin;
};
