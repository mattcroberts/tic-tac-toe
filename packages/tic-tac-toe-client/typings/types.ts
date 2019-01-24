/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
    Result,
    Parent = any,
    Context = any,
    Args = any
> = {
    subscribe<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: Context,
        info: GraphQLResolveInfo
    ): AsyncIterator<R | Result>;
    resolve?<R = Result, P = Parent>(
        parent: P,
        args: Args,
        context: Context,
        info: GraphQLResolveInfo
    ): R | Result | Promise<R | Result>;
};

export interface Query {
    grid: Grid;
    tictactoe?: TicTacToe | null;
}

export interface Grid {
    id: string;
    gridItems: GridItem[][];
    currentPlayer: Player;
    players?: (Player | null)[] | null;
    winner?: Player | null;
    isFinished: boolean;
    size: number;
    gameUrls: GameUrls;
}

export interface GridItem {
    id: string;
    player?: Player | null;
}

export interface Player {
    id: string;
    symbol: Symbol;
}

export interface GameUrls {
    NAUGHT?: string | null;
    CROSS?: string | null;
}

export interface TicTacToe {
    gamesInProgress: number;
    gamesFinished: number;
    crossWins: number;
    naughtWins: number;
    gamesDrawn: number;
}

export interface Mutation {
    executeTurn: Grid;
    newGame: Grid;
}

export interface Subscription {
    gridUpdated: Grid;
}
export interface GridQueryArgs {
    id: string;
}
export interface ExecuteTurnMutationArgs {
    id: string;
    player: string;
    x: number;
    y: number;
}
export interface GridUpdatedSubscriptionArgs {
    id: string;
}

export enum Symbol {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
}

export namespace QueryResolvers {
    export interface Resolvers<Context = any> {
        grid?: GridResolver<Grid, any, Context>;
        tictactoe?: TictactoeResolver<TicTacToe | null, any, Context>;
    }

    export type GridResolver<R = Grid, Parent = any, Context = any> = Resolver<
        R,
        Parent,
        Context,
        GridArgs
    >;
    export interface GridArgs {
        id: string;
    }

    export type TictactoeResolver<
        R = TicTacToe | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace GridResolvers {
    export interface Resolvers<Context = any> {
        id?: IdResolver<string, any, Context>;
        gridItems?: GridItemsResolver<GridItem[][], any, Context>;
        currentPlayer?: CurrentPlayerResolver<Player, any, Context>;
        players?: PlayersResolver<(Player | null)[] | null, any, Context>;
        winner?: WinnerResolver<Player | null, any, Context>;
        isFinished?: IsFinishedResolver<boolean, any, Context>;
        size?: SizeResolver<number, any, Context>;
        gameUrls?: GameUrlsResolver<GameUrls, any, Context>;
    }

    export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
        R,
        Parent,
        Context
    >;
    export type GridItemsResolver<
        R = GridItem[][],
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type CurrentPlayerResolver<
        R = Player,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type PlayersResolver<
        R = (Player | null)[] | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type WinnerResolver<
        R = Player | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type IsFinishedResolver<
        R = boolean,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type SizeResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type GameUrlsResolver<
        R = GameUrls,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace GridItemResolvers {
    export interface Resolvers<Context = any> {
        id?: IdResolver<string, any, Context>;
        player?: PlayerResolver<Player | null, any, Context>;
    }

    export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
        R,
        Parent,
        Context
    >;
    export type PlayerResolver<
        R = Player | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace PlayerResolvers {
    export interface Resolvers<Context = any> {
        id?: IdResolver<string, any, Context>;
        symbol?: SymbolResolver<Symbol, any, Context>;
    }

    export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
        R,
        Parent,
        Context
    >;
    export type SymbolResolver<
        R = Symbol,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace GameUrlsResolvers {
    export interface Resolvers<Context = any> {
        NAUGHT?: NaughtResolver<string | null, any, Context>;
        CROSS?: CrossResolver<string | null, any, Context>;
    }

    export type NaughtResolver<
        R = string | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type CrossResolver<
        R = string | null,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace TicTacToeResolvers {
    export interface Resolvers<Context = any> {
        gamesInProgress?: GamesInProgressResolver<number, any, Context>;
        gamesFinished?: GamesFinishedResolver<number, any, Context>;
        crossWins?: CrossWinsResolver<number, any, Context>;
        naughtWins?: NaughtWinsResolver<number, any, Context>;
        gamesDrawn?: GamesDrawnResolver<number, any, Context>;
    }

    export type GamesInProgressResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type GamesFinishedResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type CrossWinsResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type NaughtWinsResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
    export type GamesDrawnResolver<
        R = number,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
    export interface Resolvers<Context = any> {
        executeTurn?: ExecuteTurnResolver<Grid, any, Context>;
        newGame?: NewGameResolver<Grid, any, Context>;
    }

    export type ExecuteTurnResolver<
        R = Grid,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context, ExecuteTurnArgs>;
    export interface ExecuteTurnArgs {
        id: string;
        player: string;
        x: number;
        y: number;
    }

    export type NewGameResolver<
        R = Grid,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
    export interface Resolvers<Context = any> {
        gridUpdated?: GridUpdatedResolver<Grid, any, Context>;
    }

    export type GridUpdatedResolver<
        R = Grid,
        Parent = any,
        Context = any
    > = Resolver<R, Parent, Context, GridUpdatedArgs>;
    export interface GridUpdatedArgs {
        id: string;
    }
}
