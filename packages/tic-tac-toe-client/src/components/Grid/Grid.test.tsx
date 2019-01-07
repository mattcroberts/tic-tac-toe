import * as React from "react";
import { shallow } from "enzyme";
import Grid from ".";
import { createGrid } from "../../../test/utils";
import GridItem from "../GridItem";
import { Symbol as ISymbol } from "../../../typings/types";

describe("Grid", () => {
    const GRID_SIZE = 3;
    const defaultProps = {
        currentPlayer: ISymbol.NAUGHT,
        grid: createGrid(GRID_SIZE),
        size: GRID_SIZE
    };

    it("should render", () => {
        const component = shallow(<Grid {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it("should render grid items", () => {
        const component = shallow(<Grid {...defaultProps} />);

        expect(component.find(GridItem)).toHaveLength(GRID_SIZE * GRID_SIZE);
    });

    it("should render NAUGHT Winner", () => {
        const component = shallow(
            <Grid {...defaultProps} winner={ISymbol.NAUGHT} />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render CROSS Winner", () => {
        const component = shallow(
            <Grid {...defaultProps} winner={ISymbol.CROSS} />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render DRAW", () => {
        const component = shallow(<Grid {...defaultProps} isDraw={true} />);

        expect(component).toMatchSnapshot();
    });
});
