import gql from "graphql-tag";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import Grid from "../Grid";

const GET_GRID = gql`
    {
        grid {
            id
            gridItems {
                player
            }
            currentPlayer
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
        }
    }
`;
class GridContainer extends React.Component {
    public render() {
        const vars = {};
        return (
            <div>
                <Query query={GET_GRID}>
                    {({ data }) => {
                        const { grid } = data;
                        return grid ? (
                            <Mutation mutation={EXECUTE_TURN} variables={vars}>
                                {executeTurn => (
                                    <Grid
                                        grid={grid.gridItems}
                                        currentPlayer={grid.currentPlayer}
                                        // tslint:disable-next-line jsx-no-lambda
                                        onItemClick={(player, x, y) => {
                                            executeTurn({
                                                variables: {
                                                    id: "1",
                                                    player: grid.currentPlayer,
                                                    x,
                                                    y
                                                }
                                            });
                                        }}
                                    />
                                )}
                            </Mutation>
                        ) : null;
                    }}
                </Query>
            </div>
        );
    }
}

export default GridContainer;
