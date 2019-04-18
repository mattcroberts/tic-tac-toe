import * as React from "react";
import { Query, Mutation } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Grid as IGrid } from "../../../typings/types";
import GridPage from "../../pages/Grid";

import * as EXECUTE_TURN from "./executeTurn.graphql";
import * as GET_GRID from "./getGrid.graphql";
import * as GET_GRID_SUBS from "./getGrid.subscription.graphql";
import ErrorPage from "../../pages/Error";

export interface IProps
    extends RouteComponentProps<{ gameId: string; playerId: string }> {
    executeTurn: (
        options: {
            variables: {
                id: string;
                playerId: string;
                x: number;
                y: number;
            };
        }
    ) => IGrid;
    isMultiplayer: boolean;
    invitedPlayerId: string;
    data: {
        error: any;
        grid: IGrid;
        loading: boolean;
    };
}

export class GridContainer extends React.Component<IProps> {
    public state = {};

    public render() {
        const {
            invitedPlayerId,
            match: { params: gameId }
        } = this.props;

        return (
            <Mutation mutation={EXECUTE_TURN}>
                {executeTurn => (
                    <Query query={GET_GRID} variables={{ id: gameId.gameId }}>
                        {({
                            error,
                            data: { grid },
                            loading,
                            subscribeToMore
                        }) => {
                            if (loading) {
                                return <p>Loading...</p>;
                            }

                            if (error) {
                                console.error(error);
                                return <ErrorPage message={error.message} />;
                            }

                            if (!grid) {
                                return <ErrorPage message="Game not found" />;
                            }

                            if (!grid.players || grid.players.length < 2) {
                                return (
                                    <ErrorPage message="Players not found" />
                                );
                            }

                            const controllingPlayer = this.props.isMultiplayer
                                ? this.getControllingPlayer(
                                      grid,
                                      invitedPlayerId
                                  )
                                : grid.currentPlayer;

                            return (
                                <GridPage
                                    id={grid.id}
                                    executeTurn={executeTurn}
                                    grid={grid.gridItems}
                                    currentPlayer={grid.currentPlayer}
                                    winner={grid.winner}
                                    isDraw={
                                        grid.winner === null && grid.isFinished
                                    }
                                    size={grid.size}
                                    gameUrls={grid.gameUrls}
                                    isMultiplayer={this.props.isMultiplayer}
                                    controllingPlayer={controllingPlayer}
                                    subscribeToGridUpdates={() =>
                                        subscribeToMore({
                                            document: GET_GRID_SUBS,
                                            variables: { id: gameId.gameId },
                                            updateQuery: (
                                                prev,
                                                { subscriptionData }
                                            ) => {
                                                if (!subscriptionData.data) {
                                                    return prev;
                                                }

                                                return {
                                                    grid:
                                                        subscriptionData.data
                                                            .gridUpdated
                                                };
                                            }
                                        })
                                    }
                                />
                            );
                        }}
                    </Query>
                )}
            </Mutation>
        );
    }

    private getControllingPlayer(grid: IGrid, invitedPlayerId: string) {
        if (!grid.players || grid.players.length < 2) {
            return null;
        }

        return (
            grid.players.find(p => p !== null && p.id === invitedPlayerId) ||
            grid.players[0]
        );
    }
}

export default withRouter(GridContainer);
