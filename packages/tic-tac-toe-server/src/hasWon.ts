private hasWon(player: Player, grid: IItemState[][]): boolean {
  const rowWin = grid.reduce((hasWon, row, i, all) => {
      return (
          hasWon ||
          row.every(({ player: p }, j) => {
              return p === player;
          })
      );
  }, false);

  let colWin = false;
  const forwardDiag: IItemState[] = [];
  const backwardDiag: IItemState[] = [];
  for (let i = 0; i < grid.length; i++) {
      const col: IItemState[] = [];
      forwardDiag.push(grid[i][i]);
      backwardDiag.push(grid[i][grid.length - i - 1]);

      for (let j = 0; j < grid[i].length; j++) {
          col.push(grid[j][i]);
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
}