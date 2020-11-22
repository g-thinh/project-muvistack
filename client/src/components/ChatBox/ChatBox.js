import React, { useRef } from "react";
import styled from "styled-components";
import { auth, db } from "../../services/firebase";
import { THEMES } from "../THEMES";
import { AuthContext } from "../AuthContext";
import Spinner from "../UI/Spinner";
import Message from "./Message";
import DateModal from "../DateModal";
import { toggleDateModal } from "../../store/actions";

import { FiSend, FiCalendar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const moment = require("moment");

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const TOGGLE_MODAL = useSelector((state) => state.TOGGLERS.dateToggle);
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
  const [hasDate, setHasDate] = React.useState(null);

  function handleChange(ev) {
    setContent(ev.target.value);
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
    } catch (error) {
      setWriteError(error.message);
    }
  }

  function fetchMovieDate(url) {
    db.ref(`matches/${url}/dates`).on("value", (snapshot) => {
      if (snapshot.val()) {
        setMovieDate(snapshot.val().date);
        setHasDate(snapshot.val().suggestDate);
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
      {TOGGLE_MODAL && (
        <DateModal
          show={TOGGLE_MODAL}
          close={toggleDateModal}
          date={startDate}
          handleDateChange={setStartDate}
          movieID={props.url}
        />
      )}
      {!loading ? (
        <>
          <Messages id="messages">
            {time && (
              <Time>Created on {moment(time).format("MMMM Do, YYYY")}</Time>
            )}
            {chats.map((chat, index) => {
              // console.log("chat length", chats.length);
              // console.log("chat index", index);
              return chat.user === appUser.uid ? (
                <Message
                  isUser={true}
                  data={chat}
                  movieID={props.url}
                  key={`chat-${props.url}-${chat.user}-${chat.timestamp}`}
                />
              ) : (
                <Message
                  isUser={false}
                  data={chat}
                  movieID={props.url}
                  key={`chat-${props.url}-${chat.user}-${chat.timestamp}`}
                />
              );
            })}
          </Messages>
          <DateWrapper>
            {hasDate ? (
              <DateTime hasDate>
                The next date is: {moment(movieDate).format("MMMM Do")} at{" "}
                {moment(movieDate).format("h:mm A")}{" "}
              </DateTime>
            ) : (
              <DateTime hasDate={false}>No Movie Date</DateTime>
            )}
          </DateWrapper>

          <InputForm onSubmit={handleSubmit}>
            <Button2
              type="button"
              onClick={(ev) => dispatch(toggleDateModal(true))}
            >
              <FiCalendar size={20} color="white" />
            </Button2>
            <Input
              placeholder="Write your message here..."
              onChange={handleChange}
              value={content}
            />
            {readError ? <p>{writeError}</p> : null}
            <Button type="submit">
              <FiSend size={20} color="white" />
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
  width: 95%;
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  max-height: 50vh;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  & ::-webkit-scrollbar {
    width: 7px;
    color: lightgrey;
    height: 95%;
  }

  & ::-webkit-scrollbar-track {
    border-radius: 10px;
    height: 95%;
  }

  & ::-webkit-scrollbar-thumb {
    height: 50px;
  }

  & ::-webkit-scrollbar-thumb:hover {
  }
`;

const Messages = styled.div`
  flex: 9;
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow-y: scroll;
  background: ${THEMES.BlackCoffee};
`;

const InputForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: ${THEMES.BlackCoffee};

  @media (max-width: 1000px) {
    padding: 4px 8px;
  }
`;

const Input = styled.input`
  flex: 9;
  height: 20px;
  font-size: 16px;
  margin: 5px 0;
  padding: 16px;
  border-radius: 22px;

  &:focus {
    outline: none;
  }

  @media (max-width: 1000px) {
    padding: 12px;
    font-size: 12px;
    flex: 7;
  }
`;

const Button = styled.button`
  flex: 1;
  margin: 5px 0;
  margin-left: 8px;
  height: 20px;
  padding: 16px 12px;
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

  @media (max-width: 1000px) {
    padding: 12px;
    font-size: 12px;
  }
`;

const Button2 = styled.button`
  flex: 1;
  margin: 5px 0;
  margin-right: 8px;
  height: 20px;
  padding: 16px 0px;
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

  @media (max-width: 1000px) {
    padding: 12px 4px;
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

const DateWrapper = styled.div`
  background-color: ${THEMES.BlackCoffee};
  width: 100%;
  padding-top: 1%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const DateTime = styled.h1`
  width: 97%;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.hasDate ? "white" : THEMES.BlackCoffee)};
  font-weight: 500;
  padding: 3px 0;
  border-radius: 22px;
  background-color: ${(props) =>
    props.hasDate ? THEMES.Blue : THEMES.Secondary};

  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

export default ChatBox;
