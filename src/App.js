import React, { Component } from "react";
import logo from "./logo.svg";
import Home from "./js/Home";
import createHistory from "history/createBrowserHistory";
import { Router } from "react-router-dom";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Home />
      </Router>
    );
  }
}

export default App;
