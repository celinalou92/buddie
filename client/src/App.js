import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat
} from "@apollo/client";
// So we just imported a few key pieces to the application—let's explain what each will accomplish for us:

// ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
// ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.]
// InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
// createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.

// import { setContext } from "@apollo/client/link/context";
// get token from local storage using this above

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Taskboard from './pages/Taskboard';
import SingleMessage from "./pages/SingleMessage";




// =============== Old Code ==================//

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });


// const client = new ApolloClient({
//   request: operation => {
//     const token = localStorage.getItem('id_token');

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     });
//   },
//   uri: httpLink,
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// =============== End Old Code ==================//



const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

let token = localStorage.getItem("id_token");

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? token : " ",
    }
  }));
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});


// With the preceding code, we first establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink().
// After we create the link, we use the ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint. We also instantiate a new cache object using new InMemoryCache().

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/taskboard" component={Taskboard} />
              <Route exact path="/message/:id" component={SingleMessage} />
              <Route exact path="/" component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
