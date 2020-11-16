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
  font-size: 32px;
`;

export default CreateAvatar;
