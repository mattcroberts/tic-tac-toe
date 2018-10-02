import * as React from "react";
import Wrapper from "../../components/Wrapper";
import Grid, { IProps as IGridProps } from "../../components/Grid";
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
const GridPage: React.SFC<IProps> = props => (
    <Wrapper>
        <p>You are Player {props.controllingPlayer.symbol}</p>
        {props.isMultiplayer ? (
            <input
                readOnly={true}
                value={
                    window.location.origin +
                    (props.controllingPlayer.symbol === ISymbol.CROSS
                        ? props.gameUrls.NAUGHT
                        : props.gameUrls.CROSS)
                }
            />
        ) : null}

        <Grid {...props} />
    </Wrapper>
);

export default GridPage;
