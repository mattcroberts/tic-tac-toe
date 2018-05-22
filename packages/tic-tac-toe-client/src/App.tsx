import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import "./App.css";

import GridContainer from "./GridContainer";

const httplink = new HttpLink({
    uri: "http://localhost:3000/graphql"
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: httplink
});

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <GridContainer />;
            </ApolloProvider>
        );
    }
}

export default App;
