import { IGrid } from "../models/Grid";
import { IGridItem } from "../models/GridItem";
import { IPlayer } from "../models/Player";

const checkLine = (playerToCheck: IPlayer, line: IGridItem[]): boolean => {
    const linePlayer = line[0].player;
    return (
        !!linePlayer &&
        linePlayer.symbol === playerToCheck.symbol &&
        line.every(({ player: p }) => {
            return !!p && p.symbol === linePlayer.symbol;
        })
    );
};

export default (player: IPlayer, grid: IGrid): boolean => {
    const asGrid = grid.toGrid();
    const rowWin = asGrid.reduce((won, row) => {
        return (
            won ||
            row.every(({ player: p }) => {
                return p ? p.symbol === player.symbol : false;
            })
        );
    }, false);

    let colWin = false;
    const forwardDiag: IGridItem[] = [];
    const backwardDiag: IGridItem[] = [];
    for (let i = 0; i < grid.gridItems.length; i++) {
        const col: IGridItem[] = [];
        forwardDiag.push(asGrid[i][i]);
        backwardDiag.push(asGrid[i][grid.gridItems.length - i - 1]);

        for (let j = 0; j < asGrid[i].length; j++) {
            col.push(asGrid[j][i]);
        }

        colWin = checkLine(player, col);

        if (colWin) {
            break;
        }
    }

    const forwardDiagWin = checkLine(player, forwardDiag);
    const backwardDiagWin = checkLine(player, backwardDiag);

    return rowWin || colWin || forwardDiagWin || backwardDiagWin;
};
