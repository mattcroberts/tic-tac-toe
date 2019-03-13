import * as React from "react";
import Wrapper from "../../components/Wrapper";
import Grid, { IProps as IGridProps } from "../../components/Grid";
import {
    GameUrls as IGameUrls,
    Player as IPlayer,
    Symbol as ISymbol
} from "../../../typings/types";
import { BASE_NAME } from "../../config";

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
        <Wrapper>
            <p>You are Player {props.controllingPlayer.symbol}</p>
            {props.isMultiplayer ? (
                <input
                    readOnly={true}
                    value={`${window.location.origin}/${BASE_NAME}${path}`}
                />
            ) : null}

            <Grid {...props} />
        </Wrapper>
    );
};

export default GridPage;
