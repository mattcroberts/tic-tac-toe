import * as React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import NEW_GAME from "./newGame.graphql";

interface IProps {
    newGame: () => undefined;
}

class Home extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    public async onClick() {
        const { history, newGame }: any = this.props;
        const {
            data: { newGame: grid }
        } = await newGame();

        if (grid.id) {
            history.push(`/game/${grid.id}`);
        }
    }

    public render() {
        return (
            <React.Fragment>
                <button onClick={this.onClick}>Play</button>
            </React.Fragment>
        );
    }
}

export default compose(
    withRouter,
    graphql(NEW_GAME, {
        name: "newGame"
    })
)(Home);
