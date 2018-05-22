export const rootQuery = `
type Query {
  getGrid: Grid!
}`;

export const mutation = `
type Mutation {
  executeTurn (
    id: ID!,
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

export const GridItem = `
type GridItem {
  id: ID!
  player: String
}`;

export const Grid = `type Grid {
  id: ID!
  gridItems: [[GridItem]]
}`;
