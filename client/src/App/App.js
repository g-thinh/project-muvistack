import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../hoc";
import { AuthContext } from "../components/AuthContext";
import { Home, Profile, SignUp, Login } from "../views";

const App = () => {
  const { authenticated } = React.useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
          reroute="/"
        ></PrivateRoute>
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
          reroute="/"
        ></PublicRoute>
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
          reroute="/"
        ></PublicRoute>
      </Switch>
    </Router>
  );
};

export default App;
