import GridItem from "./GridItem";
import Player from "./Player";

class Grid {
    public gridItems: GridItem[][];

    constructor(size: number = 3) {
        this.gridItems = new Array<GridItem[]>(size);

        for (let i = 0; i < size; i++) {
            this.gridItems[i] = new Array<GridItem>(size);
            for (let j = 0; j < size; j++) {
                this.gridItems[i][j] = new GridItem();
            }
        }
    }

    public placePlayer(player: Player, x: number, y: number): Grid {
        this.gridItems[x][y].placePlayer(player);
        return this;
    }
}

export default Grid;
