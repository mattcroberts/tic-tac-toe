import * as React from "react";
import Button from "../../components/Button";

import style from "./Home.css";

export default ({
    loading = false,
    newGame
}: {
    loading: boolean;
    newGame: () => any;
}) => (
    <div className={style.root}>
        <Button disabled={loading} onClick={newGame}>
            {loading ? "Loading..." : "New Game"}
        </Button>
    </div>
);
