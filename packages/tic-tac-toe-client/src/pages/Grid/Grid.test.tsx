import * as React from "react";
import { shallow } from "enzyme";
import GridPage from ".";
import { Symbol as ISymbol } from "../../../typings/types";

describe("GridPage", () => {
    const unsubscribeMock = jest.fn();
    const defaultProps: any = {
        controllingPlayer: { symbol: ISymbol.CROSS },
        subscribeToGridUpdates: jest.fn().mockReturnValue(unsubscribeMock),
        gameUrls: {
            [ISymbol.NAUGHT]: "",
            [ISymbol.CROSS]: ""
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render", () => {
        const component = shallow(<GridPage {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });

    it("should subscribe on mounting", () => {
        const component = shallow(<GridPage {...defaultProps} />);

        expect(defaultProps.subscribeToGridUpdates).toBeCalledTimes(1);
        expect(unsubscribeMock).not.toHaveBeenCalled();
    });

    it("should unsubscribe on unmounting", () => {
        const component = shallow(<GridPage {...defaultProps} />);
        component.unmount();
        expect(defaultProps.subscribeToGridUpdates).toBeCalledTimes(1);
        expect(unsubscribeMock).toHaveBeenCalledTimes(1);
    });
});
