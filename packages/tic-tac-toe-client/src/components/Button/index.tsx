import * as React from "react";

export default ({
    children,
    disabled = false,
    onClick
}: {
    children: any;
    disabled: boolean;
    onClick?: () => undefined;
}) => (
    <button onClick={onClick} disabled={disabled}>
        {children}
    </button>
);
