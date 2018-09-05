import * as React from "react";
import { shallow } from "enzyme";
import { GridContainer } from ".";

import { Player } from "../../../typings/types";
import { createGrid } from "../../../test/utils";

describe("GridContainer", () => {
    const defaultProps = {
        data: {
            error: undefined,
            grid: {
                currentPlayer: Player.NAUGHT,
                gridItems: createGrid(3),
                id: "",
                isFinished: false,
                size: 9
            },
            loading: false
        },
        executeTurn: jest.fn()
    };

    it("renders without crashing", () => {
        const grid = shallow(<GridContainer {...defaultProps} />);
        expect(grid).toMatchSnapshot();
    });

    it("renders loading state", () => {
        const props = {
            ...defaultProps
        };

        props.data.loading = true;
        const grid = shallow(<GridContainer {...props} />);
        expect(grid).toMatchSnapshot();
    });
});
