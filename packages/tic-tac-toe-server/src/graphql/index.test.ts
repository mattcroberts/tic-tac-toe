import { Schema } from ".";

it("should have registered types", () => {
    expect(Schema).toHaveProperty("_typeMap.Grid");
    expect(Schema).toHaveProperty("_typeMap.GridItem");
    expect(Schema).toHaveProperty("_typeMap.Player");
});
