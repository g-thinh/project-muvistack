import React from "react";
import styled from "styled-components";
import { auth, db } from "../../services/firebase";
import { THEMES } from "../THEMES";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";
import Message from "./Message";
import DateModal from "../DateModal";

import { FiSend, FiCalendar } from "react-icons/fi";

const moment = require("moment");

const ChatBox = (props) => {
  const { appUser } = React.useContext(AuthContext);
  const [chats, setChats] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [readError, setReadError] = React.useState(null);
  const [writeError, setWriteError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [time, setTime] = React.useState(null);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [movieDate, setMovieDate] = React.useState(null);

  function handleChange(ev) {
    setContent(ev.target.value);
  }

  function toggleDateModal(ev) {
    setToggleModal(!toggleModal);
  }

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

  function fetchMovieDate(url) {
    db.ref(`matches/${url}/dates`).on("value", (snapshot) => {
      if (snapshot.val()) {
        setMovieDate(snapshot.val().date);
      }
    });
  }

  function fetchChatInfo(url) {
    db.ref(`matches/${url}/chat`).once("value", (snapshot) => {
      setTime(snapshot.val().created);
    });
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
    fetchChatInfo(props.url);
    fetchMovieDate(props.url);
  }, []);

  return (
    <ChatContainer>
      {/* This is just to test the dates */}
      {/* <h1>{moment(startDate).format("YYYY MMMM Do h:mm A")}</h1> */}
      <DateModal
        show={toggleModal}
        close={() => setToggleModal(false)}
        date={startDate}
        handleDateChange={setStartDate}
        movieID={props.url}
      />
      {!loading ? (
        <>
          <Messages id="messages">
            {time && (
              <Time>Created on {moment(time).format("MMMM Do, YYYY")}</Time>
            )}
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
          {movieDate ? (
            <DateTime>
              The next date is: {moment(movieDate).format("MMMM Do")} at{" "}
              {moment(movieDate).format("h:mm A")}{" "}
            </DateTime>
          ) : (
            <DateTime>No Movie Date</DateTime>
          )}

          <InputForm onSubmit={handleSubmit}>
            <Button2 type="button" onClick={(ev) => toggleDateModal(ev)}>
              <FiCalendar size={28} color="white" />
            </Button2>
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
  height: 100vh;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Messages = styled.div`
  flex: 9;
  min-height: 10vh;
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
  border-radius: 22px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  /* height: 100%; */
  margin: 5px 0;
  margin-left: 8px;
  height: 20px;
  padding: 20px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${THEMES.Primary};
  border-radius: 22px;
  cursor: pointer;
  border: 1px solid ${THEMES.Primary};

  &:hover {
    background: ${THEMES.Secondary};
  }
`;

const Button2 = styled.button`
  flex: 1;
  /* height: 100%; */
  margin: 5px 0;
  margin-right: 8px;
  height: 20px;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${THEMES.Primary};
  border-radius: 22px;
  cursor: pointer;
  border: 1px solid ${THEMES.Primary};

  &:hover {
    background: ${THEMES.Secondary};
  }
`;

const Time = styled.h1`
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: darkgrey;
  opacity: 0.8;
  font-weight: 400;
`;

const DateTime = styled.h1`
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: ${THEMES.BlackCoffee};
  opacity: 0.8;
  font-weight: 400;
  background-color: ${THEMES.Primary};
`;

export default ChatBox;
