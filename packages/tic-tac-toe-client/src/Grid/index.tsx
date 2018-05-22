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

class Grid extends React.Component<IGridProps, {}> {
    public static defaultProps = {
        currentPlayer: Player.CROSS,
        hasWon: false
    };
    constructor(props: IGridProps) {
        super(props);
    }

    public render() {
        return (
            <div className="Grid">
                {this.props.hasWon
                    ? `${this.props.hasWon} HAS WON`
                    : this.renderGrid()}
            </div>
        );
    }

    private renderGrid() {
        return (
            this.props.grid &&
            this.props.grid.map((row, rowN) => (
                <div className="Grid-row" key={`${rowN.toString()}`}>
                    {row.map((item, colN) => (
                        <React.Fragment key={`${colN}-${rowN}`}>
                            <GridItem
                                colN={rowN}
                                rowN={colN}
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
