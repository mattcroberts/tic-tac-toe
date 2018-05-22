import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import "./App.css";

import GridContainer from "./GridContainer";
// import { IItemState } from "./GridItem";

const httplink = new HttpLink({
    uri: "http://localhost:3000/graphql"
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: httplink
});

// const columns: IItemState[][] = new Array(3)
//     .fill(null)
//     .map(col => new Array(3).fill({}));

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
