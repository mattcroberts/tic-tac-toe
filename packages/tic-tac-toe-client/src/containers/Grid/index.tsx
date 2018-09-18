import * as React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Grid as IGrid, Symbol as ISymbol } from "../../../typings/types";
import Grid from "../../pages/Grid";
import * as EXECUTE_TURN from "./executeTurn.graphql";
import * as GET_GRID from "./getGrid.graphql";

export interface IProps {
    executeTurn: (
        options: {
            variables: {
                id: string;
                player: ISymbol;
                x: number;
                y: number;
            };
        }
    ) => IGrid;
    data: {
        error: any;
        grid: IGrid;
        loading: boolean;
    };
}

export class GridContainer extends React.Component<IProps> {
    public state = {};

    constructor(props: IProps) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
    }

    public render() {
        const {
            data: { error, grid, loading }
        } = this.props;
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <Grid
                grid={grid.gridItems}
                currentPlayer={grid.currentPlayer}
                winner={grid.winner}
                isDraw={grid.winner === null && grid.isFinished}
                size={grid.size}
                onItemClick={this.onItemClick}
            />
        );
    }

    private onItemClick(x: number, y: number): void {
        const {
            executeTurn,
            data: { grid }
        } = this.props;

        if (grid.gridItems[x][y].player === null) {
            executeTurn({
                variables: {
                    id: grid.id,
                    player: grid.currentPlayer.symbol,
                    x,
                    y
                }
            });
        }
    }
}

const enhance = compose(
    withRouter,
    graphql(GET_GRID, {
        options: (props: any) => ({
            variables: {
                id: props.match.params.gameId
            }
        })
    }),
    graphql(EXECUTE_TURN, {
        name: "executeTurn"
    })
);

export default enhance(GridContainer);
