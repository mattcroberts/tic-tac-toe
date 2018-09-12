import * as React from "react";
import {
    GridItem as IGridItem,
    Player as IPlayer
} from "../../../typings/types";
import GridItem from "../GridItem";

import style from "./Grid.css";

export interface IGridProps {
    grid: IGridItem[][];
    currentPlayer: IPlayer;
    winner?: IPlayer | null;
    isDraw: boolean;
    size: number;
    onItemClick: (x: number, y: number) => void;
}

class Grid extends React.Component<IGridProps> {
    public static defaultProps = {
        isDraw: false,
        onItemClick: () => undefined,
        winner: null
    };
    public render() {
        return (
            <div className={style.root}>
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
            <div className={style.row} key={`${rowN.toString()}`}>
                {row.map((item, colN) => (
                    <GridItem
                        key={`${rowN}-${colN}`}
                        colN={rowN}
                        rowN={colN}
                        onItemClick={this.props.onItemClick}
                        itemState={item}
                        position={{
                            bottom: rowN === 2,
                            left: colN === 0,
                            right: colN === 2,
                            top: rowN === 0
                        }}
                    />
                ))}
            </div>
        ));
    }
}

export default Grid;
