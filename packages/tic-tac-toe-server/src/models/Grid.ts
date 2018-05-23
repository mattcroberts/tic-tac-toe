import GridItem from "./GridItem";
import Player from "./Player";

class Grid {
    public id: string;
    public gridItems: GridItem[][];
    public currentPlayer: Player;

    constructor(size: number = 3) {
        this.id = "1";
        this.gridItems = new Array<GridItem[]>(size);
        this.currentPlayer = Player.NAUGHT;

        for (let i = 0; i < size; i++) {
            this.gridItems[i] = new Array<GridItem>(size);
            for (let j = 0; j < size; j++) {
                this.gridItems[i][j] = new GridItem(`${this.id}=${i},${j}`);
            }
        }
    }

    public placePlayer(player: Player, x: number, y: number): Grid {
        this.gridItems[x][y].placePlayer(player);
        this.currentPlayer =
            this.currentPlayer === Player.NAUGHT ? Player.CROSS : Player.NAUGHT;
        return this;
    }
}

export default Grid;
