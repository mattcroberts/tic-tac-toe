import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { Grid as TGrid, Player as TPlayer } from "../../typings/types";
import Grid from "../Grid";

const GET_GRID = gql`
    query GET_GRID {
        grid {
            id
            gridItems {
                player
            }
            currentPlayer
            winner
            isFinished
        }
    }
`;

const EXECUTE_TURN = gql`
    mutation executeTurn($id: ID!, $player: String!, $x: Int!, $y: Int!) {
        executeTurn(id: $id, player: $player, x: $x, y: $y) {
            id
            gridItems {
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
        grid: TGrid;
        loading: boolean;
    };
}

const GridContainer: React.SFC<IGridContainerProps> = ({
    executeTurn,
    data: { grid, loading }
}) => {
    if (loading) {
        return null;
    }
    return (
        <Grid
            grid={grid.gridItems}
            currentPlayer={grid.currentPlayer}
            winner={grid.winner}
            isDraw={grid.winner === null && grid.isFinished}
            // tslint:disable-next-line jsx-no-lambda
            onItemClick={(player, x, y) => {
                if (grid.gridItems[x][y].player === null) {
                    executeTurn({
                        variables: {
                            id: "1",
                            player: grid.currentPlayer,
                            x,
                            y
                        }
                    });
                }
            }}
        />
    );
};

const enhance = compose<IGridContainerProps, {}>(
    graphql(GET_GRID),
    graphql(EXECUTE_TURN, {
        name: "executeTurn"
    })
);

export default enhance(GridContainer);
