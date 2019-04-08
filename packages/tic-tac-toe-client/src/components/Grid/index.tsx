import * as React from "react";
import {
    GridItem as IGridItem,
    Player as IPlayer
} from "../../../typings/types";
import GridItem from "../GridItem";
import Winner from "../Winner";

import style from "./Grid.css";

export interface IProps {
    id: string;
    grid: IGridItem[][];
    currentPlayer: IPlayer;
    controllingPlayer: IPlayer;
    winner?: IPlayer | null;
    isDraw: boolean;
    size: number;
    executeTurn: ({ variables: ExecuteTurnMutationArgs }) => any;
}

class Grid extends React.Component<IProps> {
    public static defaultProps = {
        isDraw: false,
        winner: null
    };

    constructor(props: IProps) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
    }

    public render() {
        return (
            <div className={style.root}>
                {this.renderGrid()}
                {this.props.winner || this.props.isDraw ? (
                    <Winner winner={this.props.winner} />
                ) : null}
            </div>
        );
    }

    public onItemClick(x: number, y: number) {
        const { controllingPlayer, currentPlayer, executeTurn } = this.props;

        if (
            this.props.grid[x][y].player === null &&
            controllingPlayer !== null &&
            controllingPlayer.symbol === this.props.currentPlayer.symbol
        ) {
            executeTurn({
                variables: {
                    id: this.props.id,
                    playerId: currentPlayer.id,
                    x,
                    y
                }
            });
        }
    }

    private renderGrid() {
        return this.props.grid.map((row, rowN) => (
            <div className={style.row} key={`${rowN.toString()}`}>
                {row.map((item, colN) => (
                    <GridItem
                        key={`${rowN}-${colN}`}
                        colN={rowN}
                        rowN={colN}
                        onItemClick={this.onItemClick}
                        itemState={item}
                        isFinished={
                            this.props.winner !== null || this.props.isDraw
                        }
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
