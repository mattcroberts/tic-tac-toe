// import hasWon from "./hasWon";
// import Player, { ISymbol, IPlayerType } from "../models/Player";
// import Grid from "../models/Grid";
// import GridItem, { IGridItem } from "../models/GridItem";

// const newGrid = () =>
//     [...new Array<IGridItem>(9)].map(
//         (_, i) => new GridItem(Math.floor(i / 3), i % 3)
//     );
// describe("hasWon", () => {
//     const naughtPlayer = new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS);

//     it("should detect horizontal wins 1", () => {
//         const gridItems = newGrid();
//         gridItems[0].set("player", ISymbol.NAUGHT);
//         gridItems[1].set("player", ISymbol.NAUGHT);
//         gridItems[2].set("player", ISymbol.NAUGHT);

//         const result = hasWon(
//             naughtPlayer,
//             new Grid({
//                 _gridItems: gridItems
//             })
//         );

//         expect(result).toBe(true);
//     });

//     it("should detect horizontal wins 2", () => {
//         const gridItems = newGrid();
//         gridItems[3].set("player", ISymbol.NAUGHT);
//         gridItems[4].set("player", ISymbol.NAUGHT);
//         gridItems[5].set("player", ISymbol.NAUGHT);

//         const result = hasWon(
//             naughtPlayer,
//             new Grid({
//                 _gridItems: gridItems
//             })
//         );

//         expect(result).toBe(true);
//     });

//     it("should detect horizontal wins 3", () => {
//         const gridItems = newGrid();
//         gridItems[6].set("player", ISymbol.NAUGHT);
//         gridItems[7].set("player", ISymbol.NAUGHT);
//         gridItems[8].set("player", ISymbol.NAUGHT);

//         const result = hasWon(
//             naughtPlayer,
//             new Grid({
//                 _gridItems: gridItems
//             })
//         );

//         expect(result).toBe(true);
//     });

//     it("should detect vertical wins 1", () => {
//         const grid = new Grid({
//             _gridItems: newGrid()
//         });

//         grid.get("_gridItems")[0].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[3].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[6].set("player", ISymbol.NAUGHT);
//         const result = hasWon(naughtPlayer, grid);

//         expect(result).toBe(true);
//     });

//     it("should detect vertical wins 2", () => {
//         const grid = new Grid({
//             _gridItems: newGrid()
//         });

//         grid.get("_gridItems")[1].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[4].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[7].set("player", ISymbol.NAUGHT);
//         const result = hasWon(naughtPlayer, grid);

//         expect(result).toBe(true);
//     });

//     it("should detect vertical wins 3", () => {
//         const grid = new Grid({
//             _gridItems: newGrid()
//         });

//         grid.get("_gridItems")[2].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[5].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[8].set("player", ISymbol.NAUGHT);
//         const result = hasWon(naughtPlayer, grid);

//         expect(result).toBe(true);
//     });

//     it("should detect forward diag win", () => {
//         const grid = new Grid({
//             _gridItems: newGrid()
//         });

//         grid.get("_gridItems")[0].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[4].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[8].set("player", ISymbol.NAUGHT);
//         const result = hasWon(naughtPlayer, grid);

//         expect(result).toBe(true);
//     });

//     it("should detect backward diag win", () => {
//         const grid = new Grid({
//             _gridItems: newGrid()
//         });

//         grid.get("_gridItems")[2].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[4].set("player", ISymbol.NAUGHT);
//         grid.get("_gridItems")[6].set("player", ISymbol.NAUGHT);
//         const result = hasWon(naughtPlayer, grid);

//         expect(result).toBe(true);
//     });
// });
