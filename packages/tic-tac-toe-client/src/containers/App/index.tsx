import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";

import Routes from "../../routes";

const httplink = new HttpLink({
    uri: process.env.API_URI
});

const wsLink = new WebSocketLink({
    uri: process.env.WS_URI || "ws://localhost:5000/ws",
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httplink
);

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: link as any
});

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
