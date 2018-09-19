import * as React from "react";
import Wrapper from "../../components/Wrapper";
import Grid, { IProps as IGridProps } from "../../components/Grid";
import { GameUrls as IGameUrls } from "../../../typings/types";

type IProps = IGridProps & {
    gameUrls: IGameUrls;
};
const GridPage: React.SFC<IProps> = props => (
    <Wrapper>
        <input
            readOnly={true}
            value={window.location + (props.gameUrls.CROSS || "")}
        />
        <Grid {...props} />
    </Wrapper>
);

export default GridPage;
