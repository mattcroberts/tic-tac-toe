import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";

import Routes from "../../routes";

const httplink = new HttpLink({
    uri: process.env.API_URI
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
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
