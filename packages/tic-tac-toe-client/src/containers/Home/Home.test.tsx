import * as React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";

import HomeContainer from ".";
import HomePage from "../../pages/Home";
import * as TIC_TAC_TOE from "./tictactoe.graphql";

const mocks = [
    {
        request: {
            query: TIC_TAC_TOE
        },
        result: {
            data: {
                tictactoe: {
                    gamesInProgress: 0,
                    gamesFinished: 0,
                    gamesDrawn: 0,
                    naughtWins: 0,
                    crossWins: 0
                }
            }
        }
    }
];
describe("Home Container", () => {
    it("should render HomePage", () => {
        const component = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <HomeContainer />
                </MemoryRouter>
            </MockedProvider>
        );

        expect(component.find(HomePage)).toHaveLength(1);
    });

    it("should should pass loading prop", () => {
        const component = mount(
            <MockedProvider mocks={mocks}>
                <MemoryRouter>
                    <HomeContainer />
                </MemoryRouter>
            </MockedProvider>
        );

        expect(component.find(HomePage).props()).toHaveProperty(
            "loading",
            true
        );
    });
});
