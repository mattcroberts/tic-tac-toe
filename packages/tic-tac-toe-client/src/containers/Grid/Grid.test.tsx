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
            query: GET_GRID_SUBS
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
        history: undefined as any,
        location: undefined as any,
        match: undefined as any,
        isMultiplayer: false,
        invitedPlayerId: "123",
        data: {
            error: undefined,
            grid: {
                gameUrls: {},
                currentPlayer: {
                    id: "abc",
                    symbol: ISymbol.NAUGHT
                },
                gridItems: createGrid(3),
                id: "abc123",
                isFinished: false,
                size: 9,
                players: [
                    { id: "abc", symbol: ISymbol.NAUGHT },
                    { id: "123", symbol: ISymbol.CROSS }
                ]
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
                    playerId: "abc",
                    x: 1,
                    y: 2
                }
            });
        });

        it("should not executeTurn if square is not empty", () => {
            const temp = [...defaultProps.data.grid.gridItems];
            temp[1][2] = {
                id: "abc1234",
                player: {
                    id: "123",
                    symbol: ISymbol.NAUGHT
                }
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
