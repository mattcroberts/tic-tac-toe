import * as H from "history";
import * as React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Mutation as IMutation } from "../../../typings/types";
import NEW_GAME from "./newGame.graphql";
interface IProps {
    history: H.History;
}

class Home extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }
    public render() {
        return (
            <Mutation mutation={NEW_GAME} onCompleted={this.onNewGame}>
                {(newGame, { loading }) => {
                    const onClick = () => newGame();
                    return (
                        <button onClick={onClick} disabled={loading}>
                            {loading ? "Loading..." : "New Game"}
                        </button>
                    );
                }}
            </Mutation>
        );
    }

    private onNewGame({ newGame }: IMutation) {
        const { history } = this.props;
        if (newGame.id) {
            history.push(`/game/${newGame.id}`);
        }
    }
}

export default compose(withRouter)(Home);
