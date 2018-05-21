export const rootQuery = `
type Query {
  getGrid: Grid!
}`;

export const Player = `
type Player {
  symbol: String!
}
`;

export const GridItem = `type GridItem {
  player: Player
}`;

export const Grid = `type Grid {
  gridItems: [GridItem]
}`;
