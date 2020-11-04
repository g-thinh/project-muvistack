import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { THEMES } from "../components/THEMES";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const GroupChat = () => {
  const [user, setUser] = React.useState(auth().currentUser);
  const [chats, setChats] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [readError, setReadError] = React.useState(null);
  const [writeError, setWriteError] = React.useState(null);

  const history = useHistory();
  const location = window.location.pathname;
  const array = location.split("/");
  const URL_ID = array[array.length - 1];

  function goBack() {
    history.goBack();
  }

  function handleChange(ev) {
    setContent(ev.target.value);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    setWriteError(null);
    try {
      await db.ref(`matches/${URL_ID}/chat`).child("messages").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent("");
    } catch (error) {
      setWriteError(error.message);
    }
  }

  React.useEffect(() => {
    console.log("[Chat.js mounted]");
    setReadError(null);
    try {
      db.ref(`matches/${URL_ID}/chat`)
        .child("messages")
        .on("value", (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            if (snap) {
              chats.push(snap.val());
            }
          });
          setChats(chats);
        });
    } catch (error) {
      setReadError(error.message);
    }
  }, []);

  return (
    <PageContainer>
      <Header>
        <Button onClick={() => goBack()}>
          <FiArrowLeft size={32} />
        </Button>
        <p>Return to Convos List</p>
      </Header>
      <Text>This is a single Group Chat</Text>
      <div>
        <div style={{ border: "1px solid red" }}>
          {chats.map((chat) => {
            return <p>{chat.content}</p>;
          })}
        </div>
        # message form #
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={content} />
          {readError ? <p>{writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
      </div>
    </PageContainer>
  );
};

const Text = styled.h1`
  font-size: 32px;
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
