import * as React from "react";
import { shallow } from "enzyme";
import GridPage from ".";
import { Symbol as ISymbol } from "../../../typings/types";

describe("GridPage", () => {
    const defaultProps: any = {
        controllingPlayer: { symbol: ISymbol.CROSS },
        gameUrls: {
            [ISymbol.NAUGHT]: "",
            [ISymbol.CROSS]: ""
        }
    };
    it("should render", () => {
        const component = shallow(<GridPage {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });
});
