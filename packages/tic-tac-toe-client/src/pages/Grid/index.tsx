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
};
const GridPage: React.SFC<IProps> = props => {
    const otherSymbol =
        props.controllingPlayer.symbol === ISymbol.CROSS
            ? ISymbol.NAUGHT
            : ISymbol.CROSS;
    const path = props.gameUrls[otherSymbol];
    return (
        <Wrapper
            controllingPlayer={props.controllingPlayer}
            currentPlayer={props.currentPlayer}
            gameUrl={path}
            isMultiplayer={props.isMultiplayer}
        >
            <Grid {...props} />
        </Wrapper>
    );
};

export default GridPage;
