import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { Cry } from "../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestFriends,
  receiveFriends,
  requestFriendsError,
} from "../store/actions";
import Friend from "../components/Friend";
import { THEMES } from "../components/THEMES";

const Friends = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(auth().currentUser);
  const FRIENDS = useSelector((state) => state.FRIENDS.friends);

  function removeFriend(id) {
    try {
      db.ref(`users/${user.uid}/friends`).once("value", (snapshot) => {
        const data = snapshot.val();
        console.log("User's has friends", data);
        snapshot.forEach((snap) => {
          if (snap.val().id === id) {
            db.ref(`users/${user.uid}/friends/${snap.key}`).remove();
            console.log("Deleted Friend!");
          }
        });
        fetchFriends();
      });
    } catch (error) {
      throw error;
    }
  }

  function fetchFriends() {
    let friends = [];

    dispatch(requestFriends());
    try {
      db.ref(`users/${user.uid}/friends`).once("value", (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((snap) => {
          friends.push(snap.val());
          console.log("rendering friend", snap.val());
        });
        //this is just to remove the first fake element in the friends dB
        friends.reverse();
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
    window.scrollTo(0, 0);
    fetchFriends();
  }, [user]);

  return (
    <PageContainer>
      {FRIENDS.length < 1 ? (
        <>
          <Text>You Have No Friends!</Text>
          <Image src={Cry} alt="no-friends" />
          <Start to="/movies">
            <span>Start Matching Now!</span>
          </Start>
        </>
      ) : (
        <>
          <Text>My Friends</Text>
          <FriendsList>
            {FRIENDS.map((friend) => {
              return (
                <Friend data={friend} key={friend} delete={removeFriend} />
              );
            })}
          </FriendsList>
        </>
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

const Image = styled.img`
  margin-top: 1%;
  margin-bottom: 5%;
`;

const Start = styled(Link)`
  width: auto;
  height: 4.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Blue};
  color: white;
  border: 2px solid ${THEMES.Blue};
  outline: none;
  display: flex;
  padding: 0 2%;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 1.3rem;
    font-weight: 400;
  }

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
`;

const Text = styled.h1`
  font-size: 2.5rem;
  color: black;
  margin: 10px;
`;

export default Friends;
