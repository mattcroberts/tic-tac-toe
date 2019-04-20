import playerDataLoader from ".";
import Player, { ISymbol, IPlayerType } from "../../models/Player";

describe("Player Loader", () => {
    beforeEach(() => {
        const player = new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS);
        player.id = "123";
        Player.findOneOrFail = jest.fn().mockReturnValue(player);
    });

    it("should find objects by id", async () => {
        const player = await playerDataLoader.findById("123");

        expect(player).toBeInstanceOf(Player);
        expect(player!.id).toEqual("123");
    });
});
