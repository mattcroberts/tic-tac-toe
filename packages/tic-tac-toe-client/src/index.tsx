import * as React from "react";
import * as ReactDOM from "react-dom";

import GithubRibbon from "./components/GithubRibbon";
import App from "./containers/App";
import "./index.css";

ReactDOM.render(<GithubRibbon />, document.getElementById(
    "ribbon"
) as HTMLElement);
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
