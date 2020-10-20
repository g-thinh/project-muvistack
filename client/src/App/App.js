import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../hoc";
import { AuthContext } from "../components/AuthContext";
import Nav from "../components/Nav";
import GlobalStyles from "../components/GlobalStyles";
import { Home, Profile, SignUp, Login, Error, CreateProfile } from "../views";


const App = () => {
  const { authenticated, hasProfile } = React.useContext(AuthContext);

  return (
      <Router>
        <Nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            path="/profile"
            authenticated={authenticated}
            component={Profile}
            reroute="/"
          ></PrivateRoute>
          <PrivateRoute
            path="/create-profile"
            authenticated={authenticated}
            component={CreateProfile}
            reroute="/profile"
          ></PrivateRoute>
          <PublicRoute
            path="/login"
            authenticated={authenticated}
            component={Login}
            reroute="/create-profile"
          ></PublicRoute>
          <PublicRoute
            path="/signup"
            authenticated={authenticated && !hasProfile}
            component={SignUp}
            reroute="/create-profile"
          ></PublicRoute>
          <Route path="*" component={Error}></Route>
        </Switch>
        </Nav>
        <GlobalStyles />
      </Router>
  );
};

export default App;
