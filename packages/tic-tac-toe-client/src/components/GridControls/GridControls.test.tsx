import * as React from "react";
import { shallow } from "enzyme";
import url from "url";
import GridControls from "./index";

describe("GridControls", () => {
    const defaultProps = {
        isMultiplayer: true,
        gameUrl: "http://example.com/game/123"
    };

    it("should render for multiplayer", () => {
        const component = shallow(<GridControls {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });

    it("should render for single player", () => {
        const component = shallow(
            <GridControls {...defaultProps} isMultiplayer={false} />
        );

        expect(component).toMatchSnapshot();
    });
});
