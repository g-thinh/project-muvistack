import React from "react";
import styled from "styled-components";
import Spinner from "../UI/Spinner";
import { db, auth } from "../../services/firebase";
import { THEMES } from "../THEMES";
import { FiXCircle } from "react-icons/fi";

const Friend = (props) => {
  const FRIEND_ID = props.data.id;
  const [isFriend, setIsFriend] = React.useState(props.data.isFriend);
  const [isPending, setIsPending] = React.useState(props.data.isPending);
  const removeFriend = props.delete;
  const [user, setUser] = React.useState(auth().currentUser);
  const [friendInfo, setFriendInfo] = React.useState(null);

  function getFriend(id) {
    // console.log("[FRIEND.js] fetching user", id);
    try {
      db.ref(`users/${id}`).on("value", (snapshot) => {
        const data = snapshot.val();
        // console.log("User's friend is", data);
        setFriendInfo(data);
      });
    } catch (error) {
      throw error;
    }
  }

  function AcceptFriendRequest(id) {
    updateA(id);

    updateB(id);
  }

  function updateA(friend) {
    db.ref(`users/${friend}/friends`).once("value", (snapshot) => {
      // console.log("this is to update user A");
      const data = snapshot.val();
      snapshot.forEach((snap) => {
        if (snap.val().id === user.uid) {
          db.ref(`users/${friend}/friends/${snap.key}`).update({
            isFriend: true,
            isPending: false,
          });

          setIsFriend(true);
          setIsPending(false);
        }
      });
    });
  }

  function updateB(friend) {
    db.ref(`users/${user.uid}/friends`).once("value", (snapshot) => {
      // console.log("this is to update user B");
      const data = snapshot.val();
      snapshot.forEach((snap) => {
        if (snap.val().id === friend) {
          db.ref(`users/${user.uid}/friends/${snap.key}`).update({
            isFriend: true,
            isPending: false,
          });
        } else {
        }
      });
    });
  }

  React.useEffect(() => {
    // console.log("[FRIEND.js] data is:", props.data);
    getFriend(FRIEND_ID);
  }, [isFriend]);

  return friendInfo ? (
    <Container>
      <Avatar
        src={friendInfo.photoURL}
        alt={`friend-${friendInfo.displayName}`}
      />
      <Right>
        <Name>{friendInfo.displayName}</Name>
        <Text>{friendInfo.bioText}</Text>
        {isFriend && (
          <RemoveButton onClick={() => removeFriend(FRIEND_ID)}>
            <FiXCircle size={32} color="red" />
          </RemoveButton>
        )}
        {!isPending && !isFriend && (
          <AcceptButton onClick={() => AcceptFriendRequest(FRIEND_ID)}>
            Accept Friend Request
          </AcceptButton>
        )}
        {isPending && !isFriend && (
          <PendingText>Friend Request Pending</PendingText>
        )}
      </Right>
    </Container>
  ) : (
    <Spinner />
  );
};

const RemoveButton = styled.button`
  visibility: hidden;
  border: 1px solid #d9d9d9d9;
  margin-top: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  background-color: ${THEMES.White};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 2px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 1%;
  background: white;
  border: 2px solid #d9d9d9d9;
  border-radius: 12px;
  margin: 5px;
  &:hover {
    background-color: ${THEMES.Primary};
    border: 2px solid ${THEMES.BlackCoffee};

    & h1 {
      color: white;
    }

    & h2 {
      color: white;
    }

    & ${RemoveButton} {
      visibility: visible;
    }
  }
`;

const Avatar = styled.img`
  flex: 2;
  width: 170px;
  @media (max-width: 1000px) {
    width: 140px;
  }
`;

const Name = styled.h1`
  text-align: center;
  display: flex;
  width: 80%;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 500;
  user-select: none;
  @media (max-width: 1000px) {
    font-size: 1.3rem;
  }
`;

const Right = styled.div`
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const Text = styled.p`
  font-size: 1.5rem;
  user-select: none;
  text-align: center;
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const AcceptButton = styled.button`
  margin-top: 10px;
  width: 70%;
  height: 2.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Blue};
  color: white;
  border: 2px solid ${THEMES.Blue};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;

  &:focus {
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    /* transform: scale(1.1); */
  }

  &:active {
    transform: scale(1.1);
  }
`;

const PendingText = styled.h2`
  margin-top: 2%;
  font-size: 1.3rem;
  color: ${THEMES.Blue};
  text-align: center;
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`;

export default Friend;
