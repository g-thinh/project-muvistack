import React from "react";
import styled from "styled-components";
import { auth, db } from "../../services/firebase";
import { THEMES } from "../THEMES";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";
import Message from "./Message";

import { FiSend } from "react-icons/fi";

const ChatBox = (props) => {
  const { appUser } = React.useContext(AuthContext);
  const [chats, setChats] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [readError, setReadError] = React.useState(null);
  const [writeError, setWriteError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  function handleChange(ev) {
    setContent(ev.target.value);
  }

  // function scrollToBottom() {
  //   const list = document.getElementById("messages");
  //   list.scrollTop = list.scrollHeight;
  // }

  async function handleSubmit(ev) {
    ev.preventDefault();

    setWriteError(null);
    try {
      await db.ref(`matches/${props.url}/chat`).child("messages").push({
        content: content,
        timestamp: Date.now(),
        user: appUser.uid,
      });
      setContent("");
      // scrollToBottom();
    } catch (error) {
      setWriteError(error.message);
    }
  }

  function fetchMessages(url) {
    setReadError(null);
    try {
      db.ref(`matches/${url}/chat`)
        .child("messages")
        .on("value", (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            if (snap) {
              chats.push(snap.val());
            }
          });
          setChats(chats);
          setLoading(false);
        });
    } catch (error) {
      setReadError(error.message);
    }
  }

  React.useEffect(() => {
    fetchMessages(props.url);
  }, []);

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <ChatContainer>
      {!loading ? (
        <>
          <Messages id="messages">
            {chats.map((chat) => {
              return chat.user === appUser.uid ? (
                <Message
                  isUser={true}
                  data={chat}
                  key={`chat-${props.url}-${chat.user}-${chat.timestamp}`}
                />
              ) : (
                <Message
                  isUser={false}
                  data={chat}
                  key={`chat-${props.url}-${chat.user}-${chat.timestamp}`}
                />
              );
            })}
          </Messages>
          <InputForm onSubmit={handleSubmit}>
            <Input
              placeholder="Write your message here..."
              onChange={handleChange}
              value={content}
            />
            {readError ? <p>{writeError}</p> : null}
            <Button type="submit">
              <FiSend size={28} color="white" />
            </Button>
          </InputForm>
        </>
      ) : (
        <Spinner />
      )}
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  border: 2px solid ${THEMES.BlackCoffee};
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 80vh;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Messages = styled.div`
  flex: 9;
  min-height: 20vh;
  width: 100%;
  overflow-y: scroll;
  background: ${THEMES.BlackCoffee};
  /* border: 5px solid goldenrod; */
  /* word-wrap: break-word; */
`;

const InputForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  border-top: 3px solid ${THEMES.Secondary};
  padding: 10px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: ${THEMES.BlackCoffee};
`;

const Input = styled.input`
  flex: 9;
  height: 20px;
  font-size: 16px;
  margin: 5px 0;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  /* height: 100%; */
  margin: 5px 0;
  height: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${THEMES.Primary};
  cursor: pointer;

  &:hover {
    background: ${THEMES.Secondary};
  }
`;

export default ChatBox;
