import * as React from "react";
import { shallow } from "enzyme";
import Home from ".";

describe("Home", () => {
    const defaultProps = {
        children: <div>Test</div>,
        loading: false,
        newGame: jest.fn()
    };

    beforeEach(() => {
        defaultProps.newGame.mockClear();
    });

    it("should render", () => {
        const component = shallow(<Home {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it("should render loading indicator", () => {
        const component = shallow(<Home {...defaultProps} loading={true} />);
        expect(component).toMatchSnapshot();
    });
});
