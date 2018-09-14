import * as React from "react";
import Wrapper from "../../components/Wrapper";
import Grid, { IProps } from "../../components/Grid";

const GridPage: React.SFC<IProps> = props => (
    <Wrapper>
        <Grid {...props} />
    </Wrapper>
);

export default GridPage;
