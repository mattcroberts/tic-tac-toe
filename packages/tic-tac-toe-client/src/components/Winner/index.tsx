import * as React from "react";
import classnames from "classnames";

import { Player as IPlayer, Symbol as ISymbol } from "../../../typings/types";
import style from "./Winner.css";
import getPlayerSymbol from "../../utils/playerMap";

const Winner = ({ winner }: { winner?: IPlayer | null }) => {
    const text = winner
        ? [
              <span
                  className={classnames({
                      [style.naught]: winner.symbol === ISymbol.NAUGHT,
                      [style.cross]: winner.symbol === ISymbol.CROSS
                  })}
                  key={"winner"}
              >
                  {getPlayerSymbol(winner.symbol)}
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
