import * as React from "react";
import Button from "../../components/Button";

export default ({
    loading = false,
    newGame
}: {
    loading: boolean;
    newGame: () => undefined;
}) => (
    <Button disabled={loading} onClick={newGame}>
        {loading ? "Loading..." : "New Game"}
    </Button>
);
