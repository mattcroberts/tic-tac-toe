import * as React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import GridContainer from "./GridContainer";

export default () => (
    <>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/game" component={GridContainer} />
        <Route path="/game/:gameId" component={GridContainer} />
    </>
);
