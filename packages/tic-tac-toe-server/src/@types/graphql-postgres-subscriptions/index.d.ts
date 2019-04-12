declare module "graphql-postgres-subscriptions" {
    export class PostgresPubSub {
        constructor(...args: any[]);

        asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;

        publish(triggerName: string, payload: any): Promise<void>;

        subscribe(
            triggerName: string,
            onMessage: (...args: any[]) => void
        ): Promise<number>;

        unsubscribe(subId: number): void;
    }

    export namespace PostgresPubSub {
        namespace prototype {
            function asyncIterator<T>(
                triggers: string | string[]
            ): AsyncIterator<T>;

            function publish(triggerName: string, payload: any): Promise<void>;

            function subscribe(
                triggerName: string,
                onMessage: (...args: any[]) => void
            ): Promise<number>;

            function unsubscribe(subId: number): void;
        }
    }
}
