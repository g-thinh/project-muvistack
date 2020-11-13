import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ChatBox from "../components/ChatBox";

const moment = require("moment");

const GroupChat = () => {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [chatUsers, setChatUsers] = React.useState(null);
  const [user, setUser] = React.useState(auth().currentUser);

  const location = window.location.pathname;
  const array = location.split("/");
  const URL_ID = array[array.length - 1];

  function goBack() {
    history.push("/chat");
  }

  function getUsersList(id) {
    let users;
    let results = [];

    // Get a list of the users first
    db.ref(`matches/${id}/users`).on("value", (snapshot) => {
      const data = snapshot.val();
      users = Object.values(data);
      // console.log("The users in this chat are:", users);
      db.ref("users").on("value", (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((snap) => {
          // console.log(snap.val());
          if (users.includes(snap.val().userID)) {
            results.push(snap.val());
          }
        });
        // console.log("final results:", results);
        setChatUsers(results);
      });
    });
  }

  function getMovieInfo() {
    fetch(`/movies/${URL_ID}`)
      .then((res) => res.json())
      .then((json) => {
        setMovieInfo(json.data);
      });
  }

  function addFriend(id) {
    db.ref(`users/${user.uid}`).child("friends").push({ id });
  }

  React.useEffect(() => {
    getMovieInfo();
    getUsersList(URL_ID);
  }, []);

  return (
    <PageContainer>
      <Header>
        <Button onClick={() => goBack()}>
          <FiArrowLeft size={32} />
        </Button>
        <p>Return to Convos List</p>
      </Header>
      {movieInfo && (
        <TopChat>
          <Text>
            {movieInfo.title},{" "}
            <span>{moment(movieInfo.release_date).format("YYYY")}</span>
          </Text>
          <ChatUsers>
            {chatUsers &&
              chatUsers.map((user) => {
                return (
                  <AddFriend onClick={(ev) => addFriend(user.userID)}>
                    <Avatar src={user.photoURL} alt={`user-${user.userID}`} />
                    <StyledFiPlus size={100} />
                  </AddFriend>
                );
              })}
          </ChatUsers>
        </TopChat>
      )}
      <ChatBox url={URL_ID} />
    </PageContainer>
  );
};

const TopChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 18px;
  margin: 2% 0;
  border-radius: 12px;
  background-color: ${THEMES.Primary};
`;

const Text = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  color: white;

  & span {
    color: ${THEMES.BlackCoffee};
  }
`;

const Header = styled.div`
  display: flex;
  align-self: flex-start;
  justify-self: flex-start;
  margin: 0 20px;
  margin-top: 10px;
  align-items: center;
  /* border: 5px solid goldenrod; */

  & p {
    margin-left: 6px;
    font-size: 22px;
    font-weight: 500;
    user-select: none;
  }
`;

const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  background-color: ${THEMES.BlackCoffee};
  /* align-self: flex-start; */

  &:hover {
    background: ${THEMES.Primary};
    transform: scale(1.1);
  }
`;

const ChatUsers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 5px solid red; */
  padding: 5px;
  /* border: 5px solid red; */
  user-select: none;
`;

const StyledFiPlus = styled(FiPlus)`
  /* border: 5px solid goldenrod; */
  position: absolute;
  z-index: 10;
  opacity: 0;
  color: darkgrey;
`;

const Avatar = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  /* position: relative;
  z-index: 7; */
`;

const AddFriend = styled.button`
  position: relative;
  /* border: 1px solid red; */
  overflow: hidden;
  margin: 0 2%;
  cursor: pointer;
  background-color: transparent;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  /* width: 100%; */

  &:hover {
    & ${StyledFiPlus} {
      opacity: 0.9;
      /* z-index: 8; */
    }
    & ${Avatar} {
      filter: brightness(70%);
    }
  }
`;

export default GroupChat;
