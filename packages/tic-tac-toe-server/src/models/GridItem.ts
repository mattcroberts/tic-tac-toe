import Player from "./Player";

class GridItem {
    public id: string;
    public player: Player | null = null;

    constructor(id: string) {
        this.id = id;
    }

    public placePlayer(player: Player) {
        this.player = player;
    }
}

export default GridItem;
