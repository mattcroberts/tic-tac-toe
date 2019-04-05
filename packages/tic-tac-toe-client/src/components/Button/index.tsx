import * as React from "react";
import classNames from "classnames";
import style from "./Button.css";

export enum Size {
    SMALL = "small",
    MEDIUM = "medium"
}

const Button = ({
    children,
    disabled = false,
    onClick = () => undefined,
    className = "",
    size = Size.MEDIUM
}: {
    children?: any;
    disabled?: boolean;
    onClick?: () => any;
    className?: string;
    size?: Size;
}) => (
    <button
        className={classNames(style.root, style[size], className)}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
