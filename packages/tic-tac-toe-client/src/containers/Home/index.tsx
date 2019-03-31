import * as React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Mutation as IMutation } from "../../../typings/types";
import HomePage from "../../pages/Home";
import * as NEW_GAME from "./newGame.graphql";
import * as TIC_TAC_TOE from "./tictactoe.graphql";
import { FetchType } from "../../../node_modules/apollo-client";

interface IProps extends RouteComponentProps<{}> {}

class Home extends React.Component<IProps> {
    public state = { isMultiplayer: false };
    constructor(props: IProps) {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }

    public render() {
        return (
            <Query query={TIC_TAC_TOE} fetchPolicy={"cache-and-network"}>
                {({ data, loading }) => (
                    <Mutation mutation={NEW_GAME} onCompleted={this.onNewGame}>
                        {(mutation, { loading: mutationLoading }) => (
                            <HomePage
                                loading={loading || mutationLoading}
                                newGame={this.onNewGameClick.bind(
                                    this,
                                    mutation
                                )}
                                gameInfo={data.tictactoe}
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
