import * as React from "react";
import { shallow } from "enzyme";
import GridItem from ".";

describe("GridItem", () => {
    const defaultProps = {
        colN: 0,
        rowN: 0,
        position: {
            top: false,
            bottom: false,
            right: false,
            left: false
        },
        itemState: {
            id: "abc123",
            player: null,
            x: 0,
            y: 0
        },
        onItemClick: jest.fn()
    };

    it("should render", () => {
        const component = shallow(<GridItem {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it("should render CROSS", () => {
        const props = {
            ...defaultProps,
            itemState: {
                ...defaultProps.itemState,
                player: Player.CROSS
            }
        };
        const component = shallow(<GridItem {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("should render NAUGHT", () => {
        const props = {
            ...defaultProps,
            itemState: {
                ...defaultProps.itemState,
                player: Player.NAUGHT
            }
        };
        const component = shallow(<GridItem {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("should handle item click", () => {
        const props = {
            ...defaultProps,
            itemState: {
                ...defaultProps.itemState,
                player: Player.NAUGHT
            },
            onItemClick: jest.fn()
        };
        const component = shallow(<GridItem {...props} />);

        component.simulate("click");

        expect(props.onItemClick).toHaveBeenCalled();
        expect(props.onItemClick).toHaveBeenCalledWith(0, 0);
    });
});
