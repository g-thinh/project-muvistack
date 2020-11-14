import React from "react";
import styled from "styled-components";
import Spinner from "../UI/Spinner";
import { db } from "../../services/firebase";
import { THEMES } from "../THEMES";

const Friend = (props) => {
  const FRIEND_ID = props.data;

  const [friendInfo, setFriendInfo] = React.useState(null);

  function getFriend(id) {
    try {
      db.ref(`users/${id}`).once("value", (snapshot) => {
        const data = snapshot.val();
        console.log("User's friend is", data);
        setFriendInfo(data);
      });
    } catch (error) {
      throw error;
    }
  }
  React.useEffect(() => {
    getFriend(FRIEND_ID);
  }, []);

  return friendInfo ? (
    <Container>
      <Avatar
        src={friendInfo.photoURL}
        alt={`friend-${friendInfo.displayName}`}
      />
      <Right>
        <Name>{friendInfo.displayName}</Name>
        <Text>{friendInfo.bioText}</Text>
      </Right>
    </Container>
  ) : (
    <Spinner />
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 1%;
  background: white;
  border: 2px solid #d9d9d9d9;
  border-radius: 12px;

  &:hover {
    background-color: ${THEMES.Primary};
    border: 2px solid ${THEMES.BlackCoffee};

    & h1 {
      color: white;
    }
  }
`;

const Avatar = styled.img`
  flex: 2;
  width: 170px;
`;

const Name = styled.h1`
  text-align: center;
  display: flex;
  width: 80%;
  justify-content: center;
  font-size: 28px;
  font-weight: 500;
  user-select: none;
`;

const Right = styled.div`
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const Text = styled.p`
  font-size: 20px;
  user-select: none;
`;

export default Friend;
