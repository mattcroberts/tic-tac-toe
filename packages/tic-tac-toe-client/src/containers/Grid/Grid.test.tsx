import * as React from "react";
import { mount } from "enzyme";
import { merge } from "lodash";
import { GridContainer } from ".";

import { createGrid } from "../../../test/utils";
import Grid from "../../pages/Grid";
import { Symbol as ISymbol } from "../../../typings/types";
import { MockedProvider } from "react-apollo/test-utils";
import * as GET_GRID_SUBS from "./getGrid.subscription.graphql";
import { MemoryRouter } from "react-router";

const mocks = [
    {
        request: {
            subscription: GET_GRID_SUBS
        },
        result: {
            data: {
                gridUpdated: {}
            }
        }
    }
];
describe("GridContainer", () => {
    const defaultProps = {
        data: {
            error: undefined,
            grid: {
                currentPlayer: {
                    symbol: ISymbol.NAUGHT
                },
                gridItems: createGrid(3),
                id: "abc123",
                isFinished: false,
                size: 9,
                players: [{}, {}]
            },
            loading: false
        },
        executeTurn: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        const grid = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <GridContainer {...defaultProps} />
                </MemoryRouter>
            </MockedProvider>
        ).find(Grid);

        expect(grid).toMatchSnapshot();
    });

    it.skip("renders loading state", () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                loading: true
            }
        };

        const grid = mount(
            <MockedProvider mocks={[]} addTypename={false}>
                <MemoryRouter>
                    <GridContainer {...props} />
                </MemoryRouter>
            </MockedProvider>
        ).find(Grid);
        expect(grid).toMatchSnapshot();
    });

    describe("onItemClick", () => {
        it("should executeTurn if square is empty", () => {
            const grid = mount(
                <MockedProvider mocks={[]} addTypename={false}>
                    <MemoryRouter>
                        <GridContainer {...defaultProps} />
                    </MemoryRouter>
                </MockedProvider>
            ).find(Grid);

            const click = grid.find(Grid).prop("onItemClick");

            click(1, 2);

            expect(defaultProps.executeTurn).toHaveBeenCalled();
            expect(defaultProps.executeTurn).toHaveBeenCalledWith({
                variables: {
                    id: "abc123",
                    player: ISymbol.NAUGHT,
                    x: 1,
                    y: 2
                }
            });
        });

        it("should not executeTurn if square is not empty", () => {
            const temp = [...defaultProps.data.grid.gridItems];
            temp[1][2] = {
                id: "abc1234",
                player: ISymbol.NAUGHT
            };
            const props = merge({}, defaultProps, {
                data: {
                    grid: {
                        gridItems: temp
                    }
                }
            });

            const grid = mount(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <GridContainer {...props} />
                    </MemoryRouter>
                </MockedProvider>
            ).find(Grid);

            const click = grid.find(Grid).prop("onItemClick");

            click(1, 2);

            expect(defaultProps.executeTurn).not.toHaveBeenCalled();
        });
    });
});
