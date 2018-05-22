import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import Grid from "../Grid";

const GET_GRID = gql`
    {
        getGrid {
            gridItems {
                player
            }
        }
    }
`;
const GridContainer = () => {
    return (
        <Query query={GET_GRID}>
            {({ data }) => {
                const { getGrid: grid } = data;
                return grid ? <Grid grid={grid.gridItems} /> : null;
            }}
        </Query>
    );
};

export default GridContainer;
