import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Grid as TGrid, Player as TPlayer } from "../../../typings/types";
import Grid from "../../components/Grid";

const GET_GRID = gql`
    query GET_GRID($id: ID!) {
        grid(id: $id) {
            id
            gridItems {
                player
            }
            currentPlayer
            winner
            isFinished
            size
        }
    }
`;

const EXECUTE_TURN = gql`
    mutation executeTurn($id: ID!, $player: String!, $x: Int!, $y: Int!) {
        executeTurn(id: $id, player: $player, x: $x, y: $y) {
            id
            gridItems {
                id
                player
            }
            currentPlayer
            winner
            isFinished
        }
    }
`;

interface IGridContainerProps {
    executeTurn: (
        options: {
            variables: {
                id: string;
                player: TPlayer;
                x: number;
                y: number;
            };
        }
    ) => TGrid;
    data: {
        error: any;
        grid: TGrid;
        loading: boolean;
    };
    history: any;
}

class GridContainer extends React.Component<IGridContainerProps> {
    public state = {};

    public render() {
        const {
            executeTurn,
            data: { error, grid, loading }
        } = this.props;
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <React.Fragment>
                <Link to="/">Home</Link>
                <Grid
                    grid={grid.gridItems}
                    currentPlayer={grid.currentPlayer}
                    winner={grid.winner}
                    isDraw={grid.winner === null && grid.isFinished}
                    size={grid.size}
                    // tslint:disable-next-line jsx-no-lambda
                    onItemClick={(player, x, y) => {
                        if (grid.gridItems[x][y].player === null) {
                            executeTurn({
                                variables: {
                                    id: grid.id,
                                    player: grid.currentPlayer,
                                    x,
                                    y
                                }
                            });
                        }
                    }}
                />
            </React.Fragment>
        );
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
