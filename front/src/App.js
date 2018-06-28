import React, { Component } from "react";
import Home from "./components/Home";
import createHistory from "history/createBrowserHistory";
import { Router } from "react-router-dom";
import Layout from "./components/Layout";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
      
        <Layout />
      </Router>
    );
  }
}

export default App;
