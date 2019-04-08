import * as React from "react";
import classNames from "classnames";

import Share from "../Share";
import style from "./GridControls.css";

const GridControls = (props: {
    className?: string;
    isMultiplayer: boolean;
    gameUrl: string;
}) => (
    <div className={classNames(style.root, props.className)}>
        {props.isMultiplayer ? (
            <Share
                title="Play TicTacToe with me at irix.dev"
                url={props.gameUrl}
            />
        ) : null}
    </div>
);

export default GridControls;
