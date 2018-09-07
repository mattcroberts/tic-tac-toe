import * as React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";

import HomeContainer from ".";
import HomePage from "../../pages/Home";

describe("Home Container", () => {
    it("should render HomePage", () => {
        const component = mount(
            <MockedProvider>
                <MemoryRouter>
                    <HomeContainer />
                </MemoryRouter>
            </MockedProvider>
        );

        expect(component.find(HomePage)).toHaveLength(1);
    });

    it("should should pass loading prop", () => {
        const component = mount(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <HomeContainer />
                </MemoryRouter>
            </MockedProvider>
        );

        expect(component.find(HomePage).props()).toHaveProperty(
            "loading",
            false
        );
    });
});
