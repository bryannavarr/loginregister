import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutRouter from "./LayoutRouter";
import NoLayoutRouter from "./NoLayoutRouter";

export default function Router() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/auth" component={NoLayoutRouter} />
        <Route path="/" component={LayoutRouter} />
      </Switch>
    </React.Fragment>
  );
}
