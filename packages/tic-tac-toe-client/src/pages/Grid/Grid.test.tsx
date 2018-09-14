import * as React from "react";
import { shallow } from "enzyme";
import GridPage from ".";

describe("GridPage", () => {
    const defaultProps: any = {};
    it("should render", () => {
        const component = shallow(<GridPage {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });
});
