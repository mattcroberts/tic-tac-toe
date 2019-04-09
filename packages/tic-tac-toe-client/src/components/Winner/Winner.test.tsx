import * as React from "react";
import { shallow } from "enzyme";

import Winner from "./index";
import { Symbol as ISymbol } from "../../../typings/types";

describe("Winner", () => {
    const defaultProps = {};

    it("should render draw", () => {
        const component = shallow(<Winner {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });

    it("should render X win", () => {
        const component = shallow(
            <Winner
                {...defaultProps}
                winner={{ id: "123", symbol: ISymbol.CROSS }}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should render O win", () => {
        const component = shallow(
            <Winner
                {...defaultProps}
                winner={{ id: "123", symbol: ISymbol.NAUGHT }}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
