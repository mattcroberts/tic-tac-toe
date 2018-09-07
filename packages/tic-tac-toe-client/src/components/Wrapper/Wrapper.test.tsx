import * as React from "react";
import { shallow } from "enzyme";
import Wrapper from ".";

describe("Wrapper", () => {
    const defaultProps = {
        children: <div>Test</div>
    };

    it("should render", () => {
        const component = shallow(<Wrapper {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
