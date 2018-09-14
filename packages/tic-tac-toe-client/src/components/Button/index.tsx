import * as React from "react";
import classNames from "classnames";
import style from "./Button.css";

const Button = ({
    children,
    disabled = false,
    onClick = () => undefined,
    className = ""
}: {
    children?: any;
    disabled?: boolean;
    onClick?: () => undefined;
    className?: string;
}) => (
    <button
        className={classNames(style.root, className)}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
