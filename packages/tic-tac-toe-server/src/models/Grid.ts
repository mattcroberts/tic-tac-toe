import GridItem from "./GridItem";

export class Grid {
    public gridItems: GridItem[];

    constructor() {
        this.gridItems = new Array<GridItem>(9);
        this.gridItems.fill(new GridItem());
    }
}
