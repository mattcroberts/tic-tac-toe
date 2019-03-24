import * as React from "react";
import { shallow } from "enzyme";
import Wrapper from ".";
import { Symbol as ISymbol } from "../../../typings/types";

describe("Wrapper", () => {
    const defaultProps = {
        children: <div>Test</div>,
        controllingPlayer: { id: "123", symbol: ISymbol.CROSS },
        currentPlayer: { id: "123", symbol: ISymbol.CROSS }
    };

    it("should render", () => {
        const component = shallow(<Wrapper {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
