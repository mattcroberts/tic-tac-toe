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
    newGame: Grid;
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

export enum Player {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
}

export namespace QueryResolvers {
    export interface Resolvers<Context = any> {
        grid?: GridResolver<Grid, any, Context>;
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
}

export namespace GridResolvers {
    export interface Resolvers<Context = any> {
        id?: IdResolver<string, any, Context>;
        gridItems?: GridItemsResolver<GridItem[][], any, Context>;
        currentPlayer?: CurrentPlayerResolver<Player, any, Context>;
        winner?: WinnerResolver<Player | null, any, Context>;
        isFinished?: IsFinishedResolver<boolean, any, Context>;
        size?: SizeResolver<number, any, Context>;
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
