import React from "react";
import { Link } from "react-router-dom";
import { signout, signin } from "../helpers/auth";
import { AuthContext } from "../components/AuthContext";

const Home = () => {
  const { appUser, authenticated } = React.useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      {authenticated ? (
        <button onClick={signout} type="button">
          Sign Out
        </button>
      ) : (
        <Link to="/login">Sign In</Link>
      )}

      {authenticated && (
        <div>
          Logged in as: <strong>{appUser.email}</strong>
        </div>
      )}
    </div>
  );
};

export default Home;
