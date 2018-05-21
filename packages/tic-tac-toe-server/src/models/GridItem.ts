import Player from "./Player";

class GridItem {
    private player: Player | null = null;

    public placePlayer(player: Player) {
        this.player = player;
    }
}

export default GridItem;
