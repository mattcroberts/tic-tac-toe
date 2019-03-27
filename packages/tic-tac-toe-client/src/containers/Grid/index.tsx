import * as React from "react";
import { graphql, Subscription } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "recompose";
import { Grid as IGrid } from "../../../typings/types";
import GridPage from "../../pages/Grid";

import * as EXECUTE_TURN from "./executeTurn.graphql";
import * as GET_GRID from "./getGrid.graphql";
import * as GET_GRID_SUBS from "./getGrid.subscription.graphql";
import ErrorPage from "../../pages/Error";

export interface IProps extends RouteComponentProps<{ playerId: string }> {
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

    constructor(props: IProps) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
    }

    public render() {
        const {
            invitedPlayerId,
            data: { error, grid, loading }
        } = this.props;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (!grid) {
            return <ErrorPage message="Game not found" />;
        }

        if (!grid.players || grid.players.length < 2) {
            return <p>Player error</p>;
        }

        const controllingPlayer = this.props.isMultiplayer
            ? this.getControllingPlayer(grid, invitedPlayerId)
            : grid.currentPlayer;

        if (!controllingPlayer) {
            return <p>Player not found</p>;
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <Subscription
                subscription={GET_GRID_SUBS}
                variables={{ id: grid.id }}
            >
                {({
                    data: { gridUpdated } = { gridUpdated: undefined },
                    loading: subsLoading
                }: {
                    data: { gridUpdated: IGrid | undefined };
                    loading: boolean;
                }) => {
                    const g =
                        subsLoading || gridUpdated === undefined
                            ? grid
                            : gridUpdated;
                    return (
                        <GridPage
                            grid={g.gridItems}
                            currentPlayer={g.currentPlayer}
                            winner={g.winner}
                            isDraw={g.winner === null && g.isFinished}
                            size={g.size}
                            onItemClick={this.onItemClick}
                            gameUrls={g.gameUrls}
                            isMultiplayer={this.props.isMultiplayer}
                            controllingPlayer={controllingPlayer}
                        />
                    );
                }}
            </Subscription>
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

    private onItemClick(x: number, y: number): void {
        const {
            executeTurn,
            data: { grid }
        } = this.props;

        const controllingPlayer = this.props.isMultiplayer
            ? this.getControllingPlayer(grid, this.props.invitedPlayerId)
            : this.props.data.grid.currentPlayer;

        if (
            grid.gridItems[x][y].player === null &&
            controllingPlayer !== null &&
            controllingPlayer.symbol === grid.currentPlayer.symbol
        ) {
            executeTurn({
                variables: {
                    id: grid.id,
                    playerId: controllingPlayer.id,
                    x,
                    y
                }
            });
        }
    }
}

const enhance = compose<{}, IProps>(
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
