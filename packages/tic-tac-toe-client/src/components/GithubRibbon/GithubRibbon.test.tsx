import * as React from "react";
import { shallow } from "enzyme";
import Ribbon from ".";

describe("Ribbon", () => {
    const defaultProps = {};

    it("should render", () => {
        const component = shallow(<Ribbon {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
