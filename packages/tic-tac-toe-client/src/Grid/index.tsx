// import { merge } from "lodash";
import * as React from "react";

import GridItem, { IItemState } from "../GridItem";

import "./Grid.css";

export enum Player {
    CROSS = "CROSS",
    NAUGHT = "NAUGHT"
}
export interface IGridProps {
    grid: IItemState[][];
    currentPlayer: Player;
    winner: Player;
    isDraw: boolean;
    onItemClick: (player: string, x: number, y: number) => void;
}

class Grid extends React.Component<IGridProps, {}> {
    constructor(props: IGridProps) {
        super(props);
    }

    public render() {
        return (
            <div className="Grid">
                {this.props.winner === null
                    ? this.props.isDraw
                        ? "DRAW"
                        : this.renderGrid()
                    : `${this.props.winner} HAS WON`}
            </div>
        );
    }

    private renderGrid() {
        return this.props.grid.map((row, rowN) => (
            <div className="Grid-row" key={`${rowN.toString()}`}>
                {row.map((item, colN) => (
                    <GridItem
                        key={`${rowN}-${colN}`}
                        colN={rowN}
                        rowN={colN}
                        onItemClick={this.props.onItemClick}
                        itemState={item}
                    />
                ))}
            </div>
        ));
    }
}

export default Grid;
