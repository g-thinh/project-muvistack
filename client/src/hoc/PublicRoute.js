import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

export function PublicRoute({
  component: Component,
  authenticated,
  reroute,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={reroute} />
        )
      }
    />
  );
}
