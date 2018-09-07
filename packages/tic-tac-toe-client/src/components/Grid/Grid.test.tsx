import * as React from "react";
import { shallow } from "enzyme";
import Grid from ".";
import { createGrid } from "../../../test/utils";
import { Player } from "../../../typings/types";
import GridItem from "../GridItem";

describe("Grid", () => {
    const GRID_SIZE = 3;
    const defaultProps = {
        currentPlayer: Player.NAUGHT,
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
            <Grid {...defaultProps} winner={Player.NAUGHT} />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render CROSS Winner", () => {
        const component = shallow(
            <Grid {...defaultProps} winner={Player.CROSS} />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render DRAW", () => {
        const component = shallow(<Grid {...defaultProps} isDraw={true} />);

        expect(component).toMatchSnapshot();
    });
});
