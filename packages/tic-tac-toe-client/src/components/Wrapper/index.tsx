import * as React from "react";

import { Link } from "react-router-dom";
import style from "./Wrapper.css";
import Button, { Size } from "../Button";
import GridControls from "../GridControls";
import { Player as IPlayer } from "../../../typings/types";
import getPlayerSymbol from "../../utils/playerMap";

export default ({
    children,
    controllingPlayer,
    currentPlayer,
    isMultiplayer,
    gameUrl
}: {
    children: React.ReactNode;
    controllingPlayer: IPlayer;
    currentPlayer: IPlayer;
    isMultiplayer: boolean;
    gameUrl: string;
}) => (
    <div className={style.root}>
        <div>
            <div className={style.top}>
                <h1 className={style.heading}>Tic Tac Toe</h1>
                <Link to="/">
                    <Button className={style.button} size={Size.SMALL}>
                        Home
                    </Button>
                </Link>
                <GridControls isMultiplayer={isMultiplayer} gameUrl={gameUrl} />
            </div>
            <div className={style.turnInfo}>
                <span>
                    You:{" "}
                    {getPlayerSymbol(controllingPlayer.symbol).toUpperCase()}
                </span>
                <span>
                    Turn: {getPlayerSymbol(currentPlayer.symbol).toUpperCase()}
                </span>
            </div>
        </div>
        <div className={style.content}>{children}</div>
    </div>
);
