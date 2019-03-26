import * as React from "react";

import { Link } from "react-router-dom";
import style from "./Wrapper.css";
import Button, { Size } from "../Button";
import { Player as IPlayer } from "../../../typings/types";
import getPlayerSymbol from "../../utils/playerMap";

export default ({
    children,
    controllingPlayer,
    currentPlayer
}: {
    children: React.ReactNode;
    controllingPlayer: IPlayer;
    currentPlayer: IPlayer;
}) => (
    <div className={style.root}>
        <div className={style.inner}>
            <div className={style.top}>
                <div className={style.topLeft}>
                    <h1 className={style.heading}>Tic Tac Toe</h1>
                    <Link to="/" className={style.button} as="button">
                        <Button className={style.button} size={Size.SMALL}>
                            Home
                        </Button>
                    </Link>
                </div>

                <div className={style.turnInfo}>
                    <div>
                        You are player{" "}
                        <span
                            className={
                                style[controllingPlayer.symbol.toLowerCase()]
                            }
                        >
                            {getPlayerSymbol(controllingPlayer.symbol)}
                        </span>
                    </div>
                    <div>
                        Player{" "}
                        <span
                            className={
                                style[currentPlayer.symbol.toLowerCase()]
                            }
                        >
                            {getPlayerSymbol(controllingPlayer.symbol)}
                        </span>
                        's turn
                    </div>
                </div>
            </div>
            <div className={style.content}>{children}</div>
        </div>
    </div>
);
