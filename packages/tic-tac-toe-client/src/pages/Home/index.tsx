import * as React from "react";
import classnames from "classnames";

import Button from "../../components/Button";

import style from "./Home.css";

const Home = ({
    loading = false,
    newGame
}: {
    loading: boolean;
    newGame: () => any;
}) => (
    <div className={style.root}>
        <div>
            <h1
                className={classnames(style.heading, { [style.glow]: loading })}
            >
                Tic Tac Toe
            </h1>
        </div>
        <div>
            <Button
                className={style.button}
                disabled={loading}
                onClick={newGame}
            >
                {loading ? "Loading..." : "New Game"}
            </Button>
        </div>
    </div>
);

export default Home;
