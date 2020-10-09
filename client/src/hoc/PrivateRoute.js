import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

export function PrivateRoute({
  component: Component,
  authenticated,
  reroute,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: reroute, state: { from: props.location } }}
          />
        )
      }
    />
  );
}
