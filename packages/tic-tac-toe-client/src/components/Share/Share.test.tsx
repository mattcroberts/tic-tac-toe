import * as React from "react";
import { shallow } from "enzyme";
import url from "url";
import Share from "./index";

describe("Share", () => {
    const defaultProps = {
        title: "test title",
        url: "http://example.com/test/path"
    };

    beforeAll(() => {
        global.open = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        delete global.open;
    });

    it("should render", () => {
        const component = shallow(<Share {...defaultProps} />);

        expect(component).toMatchSnapshot();
    });

    it("should show share options on click", () => {
        const component = shallow(<Share {...defaultProps} />);
        component.find("Button").simulate("click");
        expect(component).toMatchSnapshot();

        expect(component.find(".shareButton")).toHaveLength(5);
    });

    it("should share native", () => {
        global.navigator.share = jest.fn();
        const component = shallow(<Share {...defaultProps} />);
        component.setState({ native: true });
        component.find("Button").simulate("click");
        expect(component.find(".shareButton")).toHaveLength(0);

        delete global.navigator.share;
    });

    it("should open window for facebook share", () => {
        const component = shallow(<Share {...defaultProps} />);
        component.find("Button").simulate("click");
        component
            .find(".shareButton")
            .at(0)
            .simulate("click");

        expect(global.open).toHaveBeenCalled();
        const openedPath = url.parse(
            decodeURIComponent(global.open.mock.calls[0][0]),
            true
        );

        expect(global.open.mock.calls).toHaveLength(1);

        expect(openedPath.host).toEqual("facebook.com");
        expect(openedPath.pathname).toEqual("/sharer/sharer.php");
        expect(openedPath.query.u).toEqual("http://example.com/test/path");
        expect(openedPath.query.quote).toEqual("test title");
    });

    it("should open window for whatsapp share", () => {
        const component = shallow(<Share {...defaultProps} />);
        component.find("Button").simulate("click");
        component
            .find(".shareButton")
            .at(1)
            .simulate("click");

        expect(global.open).toHaveBeenCalled();
        const openedPath = url.parse(
            decodeURIComponent(global.open.mock.calls[0][0]),
            true
        );

        expect(global.open.mock.calls).toHaveLength(1);

        expect(openedPath.host).toEqual("api.whatsapp.com");
        expect(openedPath.pathname).toEqual("/send");
        expect(openedPath.query).toEqual({
            text: `test title

http://example.com/test/path`
        });
    });

    it("should open window for messenger share", () => {
        const component = shallow(<Share {...defaultProps} />);
        component.find("Button").simulate("click");
        component
            .find(".shareButton")
            .at(2)
            .simulate("click");

        expect(global.open).toHaveBeenCalled();
        const openedPath = url.parse(
            decodeURIComponent(global.open.mock.calls[0][0]),
            true
        );

        expect(global.open.mock.calls).toHaveLength(1);

        expect(openedPath.host).toEqual("facebook.com");
        expect(openedPath.pathname).toEqual("/dialog/send");
        expect(openedPath.query).toEqual({
            app_id: "576699156169689",
            link: "http://example.com/test/path",
            redirect_uri: "http://example.com/test/path"
        });
    });

    it("should open window for email share", () => {
        const component = shallow(<Share {...defaultProps} />);
        component.find("Button").simulate("click");
        component
            .find(".shareButton")
            .at(3)
            .simulate("click");

        const openedPath = url.parse(global.open.mock.calls[0][0], true);

        expect(global.open).toHaveBeenCalledTimes(1);

        expect(openedPath.protocol).toEqual("mailto:");
        expect(openedPath.query).toEqual({
            subject: "test title",
            body: "test title\n\nhttp://example.com/test/path"
        });
    });
});
