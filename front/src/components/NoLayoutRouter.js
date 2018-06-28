import React from "react";
import { Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home"
// import AccountConfirmation from "../AccountConfirmation";
import Login from "./Login";

const NoLayoutRouter = ({ match }) => {
  return (
    <React.Fragment>
      <Route path={`${match.url}/home`} component={Home} />
      {/* <Route
        path={`${match.url}/accountconfirmation/:emailkey`} component ={AccountConfirmation}
        component={AccountConfirmation}
      /> */}
    </React.Fragment>
  );
};
export default NoLayoutRouter;
