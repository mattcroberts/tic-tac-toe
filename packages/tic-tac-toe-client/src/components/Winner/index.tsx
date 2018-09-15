import * as React from "react";
import classnames from "classnames";

import { Player } from "../../../typings/types";
import style from "./Winner.css";
import getPlayerSymbol from "../../utils/playerMap";

const Winner = ({ winner }: { winner?: Player | null }) => {
    const text = winner
        ? [
              <span
                  className={classnames({
                      [style.naught]: winner === Player.NAUGHT,
                      [style.cross]: winner === Player.CROSS
                  })}
                  key={"winner"}
              >
                  {getPlayerSymbol(winner)}
              </span>,
              " has won!"
          ]
        : null;
    return (
        <div className={style.root}>
            <span className={style.inner}>{text || "Draw"}</span>
        </div>
    );
};

export default Winner;
