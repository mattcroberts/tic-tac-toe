import * as React from "react";

import { Link } from "react-router-dom";
import style from "./Wrapper.css";

export default ({ children }: { children: React.ReactNode }) => (
    <div className={style.root}>
        <div className={style.inner}>
            <div className={style.top}>
                <h1>TIC TAC TOE</h1>
                <Link to="/" className={style.link}>
                    Home
                </Link>
            </div>
            <div className={style.content}>{children}</div>
        </div>
    </div>
);
