import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
// import createBrowserHistory from "history/createBrowserHistory";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Routes from "./routes";

const httplink = new HttpLink({
    uri: process.env.REACT_APP_API_URI
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
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <div>
                        <h1>TIC TAC TOE</h1>
                        <Routes />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
