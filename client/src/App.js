import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "./hoc/PrivateRoute";
import { PublicRoute } from "./hoc/PublicRoute";
import { auth } from "./services/firebase";
import { AuthContext } from "./components/AuthContext";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Login from "./views/Login";
import SignUp from "./views/Signup";

const App = () => {
  const { authenticated, loading } = React.useContext(AuthContext);

  return loading === true ? (
    <h2>Loading...</h2>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
        ></PrivateRoute>
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        ></PublicRoute>
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        ></PublicRoute>
      </Switch>
    </Router>
  );
};

export default App;
