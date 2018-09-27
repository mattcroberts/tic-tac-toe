import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import GridContainer, {
    IProps as IGridContainerProps
} from "./containers/Grid";
import Home from "./containers/Home";
import { withProps } from "recompose";

export default () => (
    <>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/game" component={GridContainer} />
        <Route path="/game/:gameId" component={GridContainer} />
        <Route
            path="/game/:gameId/:playerId"
            component={withProps(
                (
                    props: IGridContainerProps &
                        RouteComponentProps<{ playerId: string }>
                ) => ({
                    isMultiplayer: true,
                    invitedPlayerId: props.match.params.playerId
                })
            )(GridContainer)}
        />
    </>
);
