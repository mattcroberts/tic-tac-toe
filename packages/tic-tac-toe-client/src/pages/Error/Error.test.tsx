import * as React from "react";
import { shallow } from "enzyme";

import Error from "./index";

describe("Winner", () => {
    const defaultProps = {
        message: "test error message"
    };

    it("should render with message", () => {
        const component = shallow(<Error {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });
});
