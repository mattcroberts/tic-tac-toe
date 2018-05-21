export const rootQuery = `
type Query {
  getGrid: Grid!
}`;

export const mutation = `
type Mutation {
  executeTurn (
    player: String!,
    x: Int!,
    y: Int!
  ): Grid
}
`;

export const Player = `
type Player {
  symbol: String
}
`;

export const GridItem = `type GridItem {
  player: String
}`;

export const Grid = `type Grid {
  gridItems: [[GridItem]]
}`;
