import React from "react";
import { Router } from "react-router-dom";
import Register from "./Register";
import AccountConfirmation from "../AccountConfirmation";
import Login from "./Login";

const NoLayoutRouter = ({ match }) => {
  return (
    <React.Fragment>
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/login`} component={Login} />
      <Route
        path={`${match.url}/accountconfirmation/:emailkey`} component ={AccountConfirmation}
        component={AccountConfirmation}
      />
    </React.Fragment>
  );
};
export default NoLayoutRouter;
