import Player from "./Player";

class GridItem {
    public id: string;
    public player: Player | null = null;

    constructor(id: string) {
        this.id = id;
    }

    public placePlayer(player: Player) {
        if (this.player === null) {
            this.player = player;
        } else {
            throw new Error(`SPACE TAKEN ${this.id}`);
        }
    }
}

export default GridItem;
