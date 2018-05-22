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
    onItemClick: (player: string, x: number, y: number) => void;
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
    }

    public render() {
        return (
            <div className="Grid">
                {this.state.hasWon
                    ? `${this.state.winner} HAS WON`
                    : this.renderGrid()}
            </div>
        );
    }

    private renderGrid() {
        return (
            this.state.grid &&
            this.state.grid.map((row, rowN) => (
                <div className="Grid-row" key={`${rowN}`}>
                    {row.map((item, colN) => (
                        <React.Fragment>
                            <GridItem
                                colN={rowN}
                                rowN={colN}
                                key={`${colN}-${rowN}`}
                                onItemClick={this.props.onItemClick}
                                itemState={item}
                            />
                        </React.Fragment>
                    ))}
                </div>
            ))
        );
    }
}

export default Grid;
