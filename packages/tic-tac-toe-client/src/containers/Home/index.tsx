import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "recompose";

import { Mutation as IMutation } from "../../../typings/types";
import HomePage from "../../pages/Home";
import * as NEW_GAME from "./newGame.graphql";
import * as TIC_TAC_TOE from "./tictactoe.graphql";

interface IProps extends RouteComponentProps<{}> {}

class Home extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }
    public render() {
        return (
            <Query query={TIC_TAC_TOE}>
                {result => (
                    <Mutation mutation={NEW_GAME} onCompleted={this.onNewGame}>
                        {(newGame, { loading }) => (
                            <HomePage
                                loading={loading}
                                newGame={newGame}
                                gameInfo={result.data.tictactoe}
                            />
                        )}
                    </Mutation>
                )}
            </Query>
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
