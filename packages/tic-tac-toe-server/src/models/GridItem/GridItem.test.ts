import GridItem from ".";

describe("GridItem", () => {
    it("should have id property", () => {
        const gridItem = new GridItem();

        expect(gridItem.id).toEqual(gridItem._id);
    });
});
