import * as React from "react";
import "./App.css";

import Grid from "./Grid";
import { IItemState } from "./GridItem";

const columns: IItemState[][] = new Array(3)
  .fill(null)
  .map(col => new Array(3).fill({}));

class App extends React.Component {
  public render() {
    return <Grid grid={columns} />;
  }
}

export default App;
