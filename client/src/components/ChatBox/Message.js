import React from "react";
import styled from "styled-components";
import { auth, db } from "../../services/firebase";
import { THEMES } from "../THEMES";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";

const moment = require("moment");

const Message = (props) => {
  const { appUser } = React.useContext(AuthContext);
  const [avatar, setAvatar] = React.useState(null);

  const chat = props.data;

  function getAvatar(userID) {
    try {
      db.ref(`users/${chat.user}`).once("value", (snapshot) => {
        setAvatar(snapshot.val().photoURL);
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getAvatar();
  }, []);

  return (
    <MessageLine isUser={props.isUser} key={chat.timestamp}>
      {avatar && !props.isUser && (
        <Avatar src={avatar} alt={`user-${chat.user}`} />
      )}
      <Content>
        <p>{chat.content}</p>
        <Time isUser={props.isUser}>
          {moment(chat.timestamp).format("h:mm A")}
        </Time>
      </Content>

      {avatar && props.isUser && (
        <Avatar src={avatar} alt={`user-${chat.user}`} />
      )}
    </MessageLine>
  );
};

const MessageLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  padding: 4px 12px;
  width: 100%;
  & p {
    background: ${(props) => (props.isUser ? THEMES.Primary : "#D9D9D9")};
    color: ${(props) => (props.isUser ? "white" : THEMES.BlackCoffee)};
    padding: 3px 14px;
    border-radius: 15px;
    word-break: break-all;
    margin: 5px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

const Time = styled.span`
  color: darkgrey;
  font-size: 12px;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  margin-left: ${(props) => (props.isUser ? "0px" : "5px")};
  margin-right: ${(props) => (!props.isUser ? "0px" : "5px")};
`;

const Avatar = styled.img`
  width: 5%;
`;

export default Message;
