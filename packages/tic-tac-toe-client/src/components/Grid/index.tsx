// import { merge } from "lodash";
import * as React from "react";
import {
    GridItem as TGridItem,
    Player as TPlayer
} from "../../../typings/types";
import GridItem from "../GridItem";

import style from "./Grid.css";

export interface IGridProps {
    grid: TGridItem[][];
    currentPlayer: TPlayer;
    winner?: TPlayer | null;
    isDraw: boolean;
    size: number;
    onItemClick: (player: string, x: number, y: number) => void;
}

class Grid extends React.Component<IGridProps> {
    public render() {
        return (
            <div className={style.Grid}>
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
            <div className={style["Grid-row"]} key={`${rowN.toString()}`}>
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
