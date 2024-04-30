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
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Taskboard from './pages/Taskboard';
import SingleMessage from "./pages/SingleMessage";
import Password from "./pages/Password";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BUDDIE_BACKEND_API });

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


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              {/* <Route exact path="/" component={Password} /> */}
              <Route exact path="/password" component={Password} />
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
