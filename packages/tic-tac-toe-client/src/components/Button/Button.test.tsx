import * as React from "react";
import { shallow } from "enzyme";
import Button from ".";

describe("Button", () => {
    const defaultProps = {};

    it("should render", () => {
        const component = shallow(<Button {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it("should render disabled", () => {
        const component = shallow(<Button disabled={true} />);
        expect(component).toMatchSnapshot();
    });

    it("should render children", () => {
        const component = shallow(<Button>Button Text</Button>);
        expect(component).toMatchSnapshot();
    });

    it("should fire click handler", () => {
        const props = {
            ...defaultProps,
            onClick: jest.fn()
        };

        const component = shallow(<Button {...props} />);
        component.simulate("click");

        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});
