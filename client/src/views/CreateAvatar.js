import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import UserAvatar from "../components/UserAvatar";
import Wave from "../components/UI/Wave";

import { db, auth } from "../services/firebase";

const CreateAvatar = () => {
  const [user, setUser] = React.useState(auth().currentUser);
  const [avatar, setAvatar] = React.useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    db.ref(`users/${user.uid}`).once("value", (snapshot) => {
      setAvatar(snapshot.val().photoURL);
    });
  }, []);

  return (
    <PageContainer>
      <Text>Create an Avatar here!</Text>
      {avatar && <UserAvatar photo={avatar} />}
    </PageContainer>
  );
};

const Text = styled.h1`
  font-size: 2.5rem;
  color: black;
  margin: 10px;
  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`;

export default CreateAvatar;
