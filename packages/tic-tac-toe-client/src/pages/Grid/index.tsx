import * as React from "react";
import Wrapper from "../../components/Wrapper";
import Grid, { IProps as IGridProps } from "../../components/Grid";
import GridControls from "../../components/GridControls";

import {
    GameUrls as IGameUrls,
    Player as IPlayer,
    Symbol as ISymbol
} from "../../../typings/types";

type IProps = IGridProps & {
    gameUrls: IGameUrls;
    isMultiplayer: boolean;
    controllingPlayer: IPlayer;
    subscribeToGridUpdates: () => () => void;
};

interface IState {
    unsubscribe: () => void;
}

class GridPage extends React.Component<IProps, IState> {
    state = { unsubscribe: null };

    componentDidMount() {
        if (!this.state.unsubscribe) {
            const unsubscribe = this.props.subscribeToGridUpdates();
            this.setState(() => ({
                unsubscribe
            }));
        }
    }

    componentWillUnmount() {
        if (this.state.unsubscribe) {
            this.state.unsubscribe();
            this.setState(() => ({
                unsubscribe: null
            }));
        }
    }

    public render() {
        const {
            controllingPlayer,
            currentPlayer,
            isMultiplayer,
            gameUrls
        } = this.props;

        const otherSymbol =
            controllingPlayer.symbol === ISymbol.CROSS
                ? ISymbol.NAUGHT
                : ISymbol.CROSS;
        const path = gameUrls[otherSymbol];

        return (
            <Wrapper
                controllingPlayer={controllingPlayer}
                currentPlayer={currentPlayer}
                gameUrl={`${location.origin}/tictactoe${path}`}
                isMultiplayer={isMultiplayer}
            >
                <Grid {...this.props} />
            </Wrapper>
        );
    }
}

export default GridPage;
