import GridItem from ".";

describe("GridItem", () => {
    it("should have x property", () => {
        const gridItem = new GridItem(1, 1);

        expect(gridItem.x).toEqual(1);
    });

    it("should have y property", () => {
        const gridItem = new GridItem(1, 1);

        expect(gridItem.y).toEqual(1);
    });
});
