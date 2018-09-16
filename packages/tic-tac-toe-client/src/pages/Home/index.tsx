import * as React from "react";
import classnames from "classnames";

import Button from "../../components/Button";

import style from "./Home.css";
import { TicTacToe } from "../../../typings/types";

const renderStats = (stats: TicTacToe) => {
    if (!stats) {
        return null;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>Games In Progress</td>
                    <td>{stats.gamesInProgress}</td>
                </tr>
                <tr>
                    <td>Games Finished</td>
                    <td>{stats.gamesFinished}</td>
                </tr>
                <tr>
                    <td>Naught Wins</td>
                    <td>{stats.naughtWins}</td>
                </tr>
                <tr>
                    <td>Cross Wins</td>
                    <td>{stats.crossWins}</td>
                </tr>
                <tr>
                    <td>Games Drawn</td>
                    <td>{stats.gamesDrawn}</td>
                </tr>
            </tbody>
        </table>
    );
};

const Home = ({
    loading = false,
    newGame,
    gameInfo
}: {
    loading: boolean;
    newGame: () => any;
    gameInfo: TicTacToe;
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
            {renderStats(gameInfo)}
        </div>
    </div>
);

export default Home;
