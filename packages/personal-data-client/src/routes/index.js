import React from "react";
import { Route, Switch } from "react-router-dom";
import { Auth, HomePage } from "../components/index";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route exact path="/home-page" component={HomePage} />
    </Switch>
  );
};
