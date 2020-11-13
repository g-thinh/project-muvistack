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

const Friends = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(auth().currentUser);

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
        dispatch(receiveFriends(friends));
        console.log("These are all my friends!", friends);
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
      <Text>This is the Friends Page!</Text>
    </PageContainer>
  );
};

const Container = styled.div`
  /* border: 2px solid red; */
  /* height: 100vh; */
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 12px;
  }
`;

const Text = styled.h1`
  font-size: 32px;
`;

export default Friends;
