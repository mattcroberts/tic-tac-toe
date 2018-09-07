import * as React from "react";
import { shallow } from "enzyme";
import { merge } from "lodash";
import { GridContainer } from ".";

import { Player } from "../../../typings/types";
import { createGrid } from "../../../test/utils";
import Grid from "../../components/Grid";

describe("GridContainer", () => {
    const defaultProps = {
        data: {
            error: undefined,
            grid: {
                currentPlayer: Player.NAUGHT,
                gridItems: createGrid(3),
                id: "abc123",
                isFinished: false,
                size: 9
            },
            loading: false
        },
        executeTurn: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        const grid = shallow(<GridContainer {...defaultProps} />);
        expect(grid).toMatchSnapshot();
    });

    it("renders loading state", () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                loading: true
            }
        };

        const grid = shallow(<GridContainer {...props} />);
        expect(grid).toMatchSnapshot();
    });

    describe("onItemClick", () => {
        it("should executeTurn if square is empty", () => {
            const grid = shallow(<GridContainer {...defaultProps} />);

            const click = grid.find(Grid).prop("onItemClick");

            click(Player.NAUGHT, 1, 2);

            expect(defaultProps.executeTurn).toHaveBeenCalled();
            expect(defaultProps.executeTurn).toHaveBeenCalledWith({
                variables: {
                    id: "abc123",
                    player: Player.NAUGHT,
                    x: 1,
                    y: 2
                }
            });
        });

        it("should not executeTurn if square is not empty", () => {
            const temp = [...defaultProps.data.grid.gridItems];
            temp[1][2] = {
                id: "abc1234",
                player: Player.NAUGHT
            };
            const props = merge({}, defaultProps, {
                data: {
                    grid: {
                        gridItems: temp
                    }
                }
            });

            const grid = shallow(<GridContainer {...props} />);

            const click = grid.find(Grid).prop("onItemClick");

            click(Player.NAUGHT, 1, 2);

            expect(defaultProps.executeTurn).not.toHaveBeenCalled();
        });
    });
});
