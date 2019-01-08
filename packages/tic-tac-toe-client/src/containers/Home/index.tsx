import * as React from "react";
import { Mutation, Query, MutationFn } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "recompose";

import { Mutation as IMutation } from "../../../typings/types";
import HomePage from "../../pages/Home";
import * as NEW_GAME from "./newGame.graphql";
import * as TIC_TAC_TOE from "./tictactoe.graphql";

interface IProps extends RouteComponentProps<{}> {}

class Home extends React.Component<IProps> {
    public state = { isMultiplayer: false };
    constructor(props: IProps) {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }

    public render() {
        return (
            <Query query={TIC_TAC_TOE}>
                {result => (
                    <Mutation mutation={NEW_GAME} onCompleted={this.onNewGame}>
                        {(mutation, { loading }) => (
                            <HomePage
                                loading={loading}
                                newGame={this.onNewGameClick.bind(
                                    this,
                                    mutation
                                )}
                                gameInfo={result.data.tictactoe}
                            />
                        )}
                    </Mutation>
                )}
            </Query>
        );
    }

    private onNewGameClick(mutation: MutationFn, isMultiplayer: boolean) {
        this.setState({ isMultiplayer }, () => {
            mutation();
        });
    }

    private onNewGame({ newGame }: IMutation) {
        const { history } = this.props;
        if (this.state.isMultiplayer) {
            history.push(`/game/${newGame.id}/${newGame.currentPlayer.id}`);
        } else {
            history.push(`/game/${newGame.id}`);
        }
    }
}

export default compose(withRouter)(Home);
