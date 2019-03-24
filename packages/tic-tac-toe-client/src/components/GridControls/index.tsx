import * as React from "react";

import { Player as IPlayer } from "../../../typings/types";
import { BASE_NAME } from "../../config";

const GridControls = (props: {
    isMultiplayer: boolean;
    controllingPlayer: IPlayer;
    gameUrl: string;
}) => (
    <div>
        {props.isMultiplayer ? (
            <input
                readOnly={true}
                value={`${window.location.origin}/${BASE_NAME}${props.gameUrl}`}
            />
        ) : null}
    </div>
);

export default GridControls;
