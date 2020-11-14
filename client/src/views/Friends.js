import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { FiAlertOctagon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  requestFriends,
  receiveFriends,
  requestFriendsError,
} from "../store/actions";
import Friend from "../components/Friend";

const Friends = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(auth().currentUser);
  const FRIENDS = useSelector((state) => state.FRIENDS.friends);

  function fetchFriends() {
    let friends = [];

    dispatch(requestFriends());
    try {
      db.ref(`users/${user.uid}/friends`).on("value", (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((snap) => {
          console.log(snap.val());
          friends.push(snap.val());
        });
        //this is just to remove the first fake element in the friends dB
        friends.shift();
        console.log("These are all my friends!", friends);
        dispatch(receiveFriends(friends));
        // setFriends(friends);
      });
    } catch (error) {
      console.log("Error Fetching Friends", error);
      dispatch(requestFriendsError());
    }
  }

  React.useEffect(() => {
    fetchFriends();
  }, [user]);

  return (
    <PageContainer>
      <Text>My Friends</Text>
      {!FRIENDS ? (
        <Text>You Have No Friends!</Text>
      ) : (
        <FriendsList>
          {FRIENDS.map((friend) => {
            return <Friend data={friend} key={friend} />;
          })}
        </FriendsList>
      )}
    </PageContainer>
  );
};

const FriendsList = styled.div`
  width: 95%;
  height: auto;
  /* border: 5px solid green; */
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;

const Text = styled.h1`
  font-size: 32px;
  color: black;
  margin: 10px;
`;

export default Friends;
