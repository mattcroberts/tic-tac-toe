import * as React from "react";
import { shallow } from "enzyme";
import Grid from ".";
import { createGrid } from "../../../test/utils";
import GridItem from "../GridItem";
import { Symbol as ISymbol } from "../../../typings/types";

describe("Grid", () => {
    const GRID_SIZE = 3;
    const defaultProps = {
        id: "123",
        executeTurn: jest.fn(),
        currentPlayer: {
            id: "123",
            symbol: ISymbol.NAUGHT
        },
        controllingPlayer: {
            id: "456",
            symbol: ISymbol.CROSS
        },
        grid: createGrid(GRID_SIZE),
        size: GRID_SIZE,
        isDraw: false,
        onItemClick: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

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
            <Grid
                {...defaultProps}
                winner={{ id: "123", symbol: ISymbol.NAUGHT }}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render CROSS Winner", () => {
        const component = shallow(
            <Grid
                {...defaultProps}
                winner={{ id: "123", symbol: ISymbol.NAUGHT }}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render DRAW", () => {
        const component = shallow(<Grid {...defaultProps} isDraw={true} />);

        expect(component).toMatchSnapshot();
    });

    describe("onItemClick", () => {
        it("should executeTurn if square is empty", () => {
            const grid = shallow<Grid>(
                <Grid
                    {...{
                        ...defaultProps,
                        currentPlayer: { id: "789", symbol: ISymbol.CROSS }
                    }}
                />
            );

            grid.instance().onItemClick(1, 2);

            expect(defaultProps.executeTurn).toHaveBeenCalled();
            expect(defaultProps.executeTurn).toHaveBeenCalledWith({
                variables: {
                    id: "123",
                    playerId: "789",
                    x: 1,
                    y: 2
                }
            });
        });

        it("should not executeTurn if square is not empty", () => {
            const props = { ...defaultProps };
            props.grid[1][2] = {
                id: "123",
                player: {
                    id: "123",
                    symbol: ISymbol.NAUGHT
                }
            };
            const grid = shallow<Grid>(<Grid {...props} />);

            grid.instance().onItemClick(1, 2);

            expect(defaultProps.executeTurn).not.toHaveBeenCalled();
        });
    });
});
