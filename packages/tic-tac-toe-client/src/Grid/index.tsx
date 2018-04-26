// import { merge } from "lodash";
import * as React from "react";

import GridItem, { IItemState } from "../GridItem";

import "./Grid.css";

export enum Player {
  CROSS = "X",
  NAUGHT = "0"
}
export interface IGridProps {
  grid: IItemState[][];
  currentPlayer?: Player;
  hasWon?: boolean;
}

interface IGridState {
  grid: IItemState[][];
  currentPlayer: Player;
  hasWon: boolean;
  winner: Player | null;
}

class Grid extends React.Component<IGridProps, IGridState> {
  public static defaultProps = {
    currentPlayer: Player.CROSS,
    hasWon: false
  };
  constructor(props: IGridProps) {
    super(props);
    this.state = {
      currentPlayer: props.currentPlayer as Player,
      grid: props.grid,
      hasWon: props.hasWon as boolean,
      winner: null
    };

    this.hasWon = this.hasWon.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  public render() {
    return (
      <div className="Grid">
        {this.state.hasWon ? `${this.state.winner} HAS WON` : this.renderGrid()}
      </div>
    );
  }

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

  private onItemClick(colN: number, rowN: number) {
    if (!this.state.hasWon) {
      this.setState(prevState => {
        const nextGrid = Array.from(prevState.grid);
        nextGrid[colN][rowN] = { player: prevState.currentPlayer };
        const crossHasWon = this.hasWon(Player.CROSS, nextGrid);
        const naughtHasWon = this.hasWon(Player.NAUGHT, nextGrid);

        const newState = {
          ...prevState,
          grid: nextGrid,
          hasWon: crossHasWon || naughtHasWon,
          winner: crossHasWon
            ? Player.CROSS
            : naughtHasWon
              ? Player.NAUGHT
              : null
        };

        if (!crossHasWon && !naughtHasWon) {
          newState.currentPlayer =
            prevState.currentPlayer === Player.CROSS
              ? Player.NAUGHT
              : Player.CROSS;
        }

        return newState;
      });
    }
  }

  private renderGrid() {
    return this.state.grid.map((row, rowN) => (
      <div className="Grid-row" key={`${rowN}`}>
        {row.map((item, colN) => (
          <React.Fragment>
            <span>
              {rowN},
              {colN}
            </span>
            <GridItem
              colN={rowN}
              rowN={colN}
              key={`${colN}-${rowN}`}
              onItemClick={this.onItemClick}
              itemState={item}
            />
          </React.Fragment>
        ))}
      </div>
    ));
  }
}

export default Grid;
