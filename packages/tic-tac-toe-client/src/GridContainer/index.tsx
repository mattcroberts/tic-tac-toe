import gql from "graphql-tag";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import Grid from "../Grid";

const GET_GRID = gql`
    {
        getGrid {
            gridItems {
                player
            }
        }
    }
`;

const EXECUTE_TURN = gql`
    mutation executeTurn($player: String!, $x: Int!, $y: Int!) {
        executeTurn(player: $player, x: $x, y: $y) {
            gridItems {
                player
            }
        }
    }
`;
class GridContainer extends React.Component {
    public render() {
        const vars = {};
        return (
            <Query query={GET_GRID}>
                {({ data }) => {
                    const { getGrid: grid } = data;
                    return grid ? (
                        <Mutation mutation={EXECUTE_TURN} variables={vars}>
                            {executeTurn => (
                                <Grid
                                    grid={grid.gridItems}
                                    // tslint:disable-next-line jsx-no-lambda
                                    onItemClick={(player, x, y) => {
                                        //
                                        executeTurn({
                                            variables: {
                                                player: "X",
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
        );
    }
}

export default GridContainer;
