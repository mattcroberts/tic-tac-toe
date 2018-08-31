import * as React from "react";

import style from "./Wrapper.css";

export default ({ children }: { children: any }) => (
    <div className={style.root}>
        <h1>TIC TAC TOE</h1>
        {children}
    </div>
);
