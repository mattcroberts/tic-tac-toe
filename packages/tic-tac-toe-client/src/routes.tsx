import * as React from "react";
import { Route } from "react-router-dom";

import GridContainer from "./containers/Grid";
import Home from "./containers/Home";

export default () => (
    <>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/game" component={GridContainer} />
        <Route path="/game/:gameId" component={GridContainer} />
    </>
);
