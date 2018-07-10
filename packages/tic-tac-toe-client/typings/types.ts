/* tslint:disable */

export interface Query {
    grid: Grid;
}

export interface Grid {
    id: string;
    gridItems: GridItem[][];
    currentPlayer: Player;
    winner?: Player | null;
    isFinished: boolean;
    size: number;
}

export interface GridItem {
    id: string;
    player?: Player | null;
}

export interface Mutation {
    executeTurn: Grid;
}
export interface ExecuteTurnMutationArgs {
    id: string;
    player: string;
    x: number;
    y: number;
}

export enum Player {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
}
