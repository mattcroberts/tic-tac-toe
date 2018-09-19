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
        <table className={style.stats}>
            <tbody>
                <tr>
                    <td className={style.cell}>Games In Progress</td>
                    <td className={style.cell}>{stats.gamesInProgress}</td>
                </tr>
                <tr>
                    <td className={style.cell}>Games Finished</td>
                    <td className={style.cell}>{stats.gamesFinished}</td>
                </tr>
                <tr>
                    <td className={style.cell}>Naught Wins</td>
                    <td className={style.cell}>{stats.naughtWins}</td>
                </tr>
                <tr>
                    <td className={style.cell}>Cross Wins</td>
                    <td className={style.cell}>{stats.crossWins}</td>
                </tr>
                <tr>
                    <td className={style.cell}>Games Drawn</td>
                    <td className={style.cell}>{stats.gamesDrawn}</td>
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
            <div className={style.buttonContainer}>
                <Button
                    className={style.button}
                    disabled={loading}
                    onClick={newGame}
                >
                    {"New Game"}
                </Button>
                <Button
                    className={style.button}
                    disabled={loading}
                    onClick={newGame}
                >
                    {"Multiplayer"}
                </Button>
            </div>
            {renderStats(gameInfo)}
        </div>
    </div>
);

export default Home;
