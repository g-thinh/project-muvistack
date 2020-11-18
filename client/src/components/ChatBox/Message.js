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
  const [hasDate, setHasDate] = React.useState(props.data.setDate);
  const [allUsers, setAllUsers] = React.useState(null);
  const [isLatest, setIsLatest] = React.useState(null);
  const [answered, setAnswered] = React.useState(null);

  const movieID = props.movieID;
  const chat = props.data;

  const suggestedDate = props.data.suggestedDate;

  function acceptDate(choice) {
    const url = `matches/${movieID}/dates/users/${appUser.uid}`;
    try {
      db.ref(url).update({ isGoing: true });
      checkDate();
      confirmDate();
      // setHasDate(false);
    } catch (error) {
      console.log(error);
    }
  }

  function rejectDate() {
    const url = `matches/${movieID}/dates/users/${appUser.uid}`;
    try {
      db.ref(url).update({ isGoing: false });
      checkDate();
      setHasDate(false);
    } catch (error) {
      console.log(error);
    }
  }

  function isLatestDate() {
    db.ref(`matches/${movieID}/dates`).on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.date == suggestedDate) {
          setIsLatest(true);
        }
      }
    });

    db.ref(`matches/${movieID}/dates/users/${appUser.uid}`).on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        if (snapshot.val()) {
          if (snapshot.val().isGoing) {
            setAnswered(true);
          } else {
            setAnswered(false);
          }
        }
      }
    );
  }

  function getParticipants() {
    //returns the number of participants in the chat
    db.ref(`matches/${movieID}`).once("value", (snapshot) => {
      const data = snapshot.val().users;
      if (data) {
        console.log(`there are ${Object.values(data).length} in this chat`);
        setAllUsers(Object.values(data).length);
      }
    });
  }

  function confirmDate() {
    let results = [];
    let count = allUsers;
    // Check if all participants agree to the date
    const url = `matches/${movieID}/dates/users`;
    db.ref(url).on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        let val = snap.val();
        let key = snap.key;
        // console.log("val, key", val, key);
        if (snap.val()) {
          results.push(snap.key);
        }
      });
    });
    console.log("results", results.length);
    console.log("count", count);
    if (results.length === count) {
      console.log("Everyone agrees to watch the movie!");
      db.ref(`matches/${movieID}/dates`).update({ suggestDate: true });
    } else {
      console.log("Missing people to watch movie");
    }
  }

  function getAvatar() {
    try {
      db.ref(`users/${chat.user}`).once("value", (snapshot) => {
        setAvatar(snapshot.val().photoURL);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function checkDate() {
    try {
      db.ref(`matches/${movieID}/dates/users`).on("value", (snapshot) => {
        const data = snapshot.val();
        // console.log("These are the participants", data);
        snapshot.forEach((snap) => {
          // console.log("this user", appUser.uid);
          // console.log("is currently going?", snap.val());
          if (snap.val().isGoing && appUser.uid == snap.key) {
            setHasDate(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    isLatestDate();
    getParticipants();
    checkDate();
    getAvatar();
  }, []);

  return (
    <>
      <MessageLine isUser={props.isUser} key={chat.timestamp}>
        {avatar && !props.isUser && (
          <Avatar src={avatar} alt={`user-${chat.user}`} />
        )}
        <Content>
          <p>{chat.content}</p>
          <Time isUser={props.isUser}>
            {/* <span>{moment(chat.timestamp).format("MMM Do, YYYY")} at </span> */}
            {/* <span>{moment(chat.timestamp).format("h:mm A")}</span> */}
            {moment(chat.timestamp).format("h:mm A")}
          </Time>
        </Content>

        {/* {avatar && props.isUser && (
          <Avatar src={avatar} alt={`user-${chat.user}`} />
        )} */}
      </MessageLine>
      {/* {chat.setDate && !props.isUser && ( */}
      {/* To render only if its the latest suggested date, not the user who asked, and has already answered */}
      {!answered && isLatest && !props.isUser && (
        <Form>
          <button onClick={(ev) => acceptDate()}>Yes! Sounds good.</button>
          <button onClick={(ev) => rejectDate()}>No, i'm not available.</button>
        </Form>
      )}
    </>
  );
};

const Time = styled.span`
  color: darkgrey;
  font-size: 12px;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  margin-left: ${(props) => (props.isUser ? "0px" : "5px")};
  margin-right: ${(props) => (!props.isUser ? "0px" : "5px")};
  user-select: none;
  /* margin-bottom: 5px; */
  /* padding: 3px 0; */
  /* border: 1px solid red; */
  & span {
    visibility: hidden;
    position: absolute;
    transform: ${(props) =>
      props.isUser ? "translateX(-105%)" : "translateX(50%)"};
  }
`;

const MessageLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  padding: 4px 12px;
  /* padding: 1.5% 1%; */
  width: 100%;
  & p {
    background: ${(props) => (props.isUser ? THEMES.Primary : "#D9D9D9")};
    color: ${(props) => (props.isUser ? "white" : THEMES.BlackCoffee)};
    padding: 3px 12px;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 15px;
    word-break: break-all;
    margin: 5px;
  }

  &:hover {
    & ${Time} {
      & span {
        visibility: visible;

        animation: fadein 0.5s;

        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  /* border: 5px solid red; */
  width: auto;
`;

const Avatar = styled.img`
  width: 40px;
`;

const Form = styled.div`
  /* border: 2px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  /* margin: 12px; */
  width: 100%;
  user-select: none;
  & button {
    padding: 14px;
    margin: 0 5px;
    color: ${THEMES.Primary};
    font-size: 16px;
    cursor: pointer;
    border: 2px solid ${THEMES.Primary};
    border-radius: 12px;
    background-color: ${THEMES.BlackCoffee};

    &:hover {
      color: white;
      background-color: ${THEMES.Primary};
    }
  }
`;

export default Message;
