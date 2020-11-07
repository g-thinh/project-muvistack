import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ChatBox from "../components/ChatBox";

const moment = require("moment");

const GroupChat = () => {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [chatUsers, setChatUsers] = React.useState(null);

  const location = window.location.pathname;
  const array = location.split("/");
  const URL_ID = array[array.length - 1];

  function goBack() {
    history.push("/chat");
    // history.goBack();
  }

  function getUsersList(id) {
    let users;
    let results = [];

    // Get a list of the users first
    db.ref(`matches/${id}/users`).on("value", (snapshot) => {
      const data = snapshot.val();
      users = Object.values(data);
      console.log("The users in this chat are:", users);
      db.ref("users").on("value", (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((snap) => {
          // console.log(snap.val());
          if (users.includes(snap.val().userID)) {
            results.push(snap.val());
          }
        });
        console.log("final results:", results);
        setChatUsers(results);
      });
    });

    // Push users that have matched into the results array
  }

  function getMovieInfo() {
    fetch(`/movies/${URL_ID}`)
      .then((res) => res.json())
      .then((json) => {
        setMovieInfo(json.data);
      });
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
            {movieInfo.original_title},{" "}
            {moment(movieInfo.release_date).format("YYYY")}
          </Text>
          <ChatUsers>
            {chatUsers &&
              chatUsers.map((user) => {
                return (
                  <Avatar src={user.photoURL} alt={`user-${user.userID}`} />
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
  width: 100%;
  margin: 10px 0;
`;

const ChatUsers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 5px solid red; */
  height: 100%;
  user-select: none;
`;

const Avatar = styled.img`
  width: 8%;
  user-select: none;
`;
const Text = styled.h1`
  font-size: 44px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-self: flex-start;
  justify-self: flex-start;
  margin: 20px;
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
export default GroupChat;
