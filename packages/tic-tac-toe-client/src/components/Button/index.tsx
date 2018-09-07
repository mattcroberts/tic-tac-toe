import * as React from "react";

const Button = ({
    children,
    disabled = false,
    onClick = () => undefined
}: {
    children?: any;
    disabled?: boolean;
    onClick?: () => undefined;
}) => (
    <button onClick={onClick} disabled={disabled}>
        {children}
    </button>
);

export default Button;
