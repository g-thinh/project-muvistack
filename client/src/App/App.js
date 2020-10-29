import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../hoc";
import { AuthContext } from "../components/AuthContext";
import Nav from "../components/Nav";
import GlobalStyles from "../components/GlobalStyles";
import {
  Start,
  Profile,
  SignUp,
  Login,
  Error,
  CreateProfile,
  Movies,
} from "../views";
import Spinner from "../components/UI/Spinner";

const App = () => {
  const { authenticated, hasProfile } = React.useContext(AuthContext);
  // console.log("Currenth authentication:", authenticated);
  return (
    <Router>
      <Nav>
        <Switch>
          <Route exact path="/" component={Start}></Route>
          <PrivateRoute
            path="/profile"
            authenticated={authenticated}
            component={Profile}
            reroute="/"
          ></PrivateRoute>
          <PrivateRoute
            path="/movies"
            authenticated={authenticated}
            component={Movies}
            reroute="/"
          ></PrivateRoute>
          <PrivateRoute
            path="/create-profile"
            authenticated={authenticated && !hasProfile}
            component={CreateProfile}
            reroute="/"
          ></PrivateRoute>
          <PublicRoute
            path="/login"
            authenticated={authenticated}
            component={Login}
            reroute={hasProfile ? "/create-profile" : "/profile"}
            // reroute="/profile"
          ></PublicRoute>
          <PublicRoute
            path="/signup"
            authenticated={authenticated}
            component={SignUp}
            reroute="/create-profile"
          ></PublicRoute>
          <PublicRoute
            path="*"
            authenticated={!authenticated}
            component={Error}
            reroute="/"
          ></PublicRoute>
        </Switch>
      </Nav>
      <GlobalStyles />
    </Router>
  );
};

export default App;
