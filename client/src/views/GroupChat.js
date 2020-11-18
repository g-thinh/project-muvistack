import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { auth, db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { THEMES } from "../components/THEMES";
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ChatBox from "../components/ChatBox";
import Snackbar from "../components/Snackbar";

const moment = require("moment");

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const GroupChat = () => {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [chatUsers, setChatUsers] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(auth().currentUser.uid);

  const [isActive, setIsActive] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState(null);

  const location = window.location.pathname;
  const array = location.split("/");
  const URL_ID = array[array.length - 1];

  function openSnackbar(message) {
    setSnackMessage(message);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  }

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
        // whenever the snackbar fires, it re-fetches the user list, and every users
        // adds each other so it exponentially increases
        // this function is to remove duplicates quickly
        let test = removeDuplicates(results, "displayName");
        // console.log("test", test);
        // console.log("final results:", results);
        setChatUsers(test);
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
    // check if that friend already exists
    db.ref(`users/${id}/friends`).once("value", (snapshot) => {
      const data = snapshot.val();
      let currentFriends = [];
      if (data) {
        const allFriends = Object.values(data);
        allFriends.forEach((friend) => {
          if (friend.id) {
            currentFriends.push(friend.id);
          }
        });
        // console.log("this friend has friends:", currentFriends);

        if (!currentFriends.includes(currentUser)) {
          openSnackbar("Friend Request Sent!");
          console.log("adding this user as a friend");

          db.ref(`users/${currentUser}`)
            .child("friends")
            .push({ id, isFriend: false, isPending: true });

          db.ref(`users/${id}`)
            .child("friends")
            .push({ id: currentUser, isFriend: false, isPending: false });
        } else {
          console.log("this friend was already added");
          openSnackbar("Already a Friend!");
        }
      }
    });
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("GroupChat current user is", currentUser);
    getMovieInfo();
    getUsersList(URL_ID);
  }, [snackMessage]);

  return (
    <PageContainer>
      <Snackbar show={isActive}>{snackMessage}</Snackbar>
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
                return user.userID != currentUser ? (
                  <AddFriend onClick={(ev) => addFriend(user.userID)}>
                    <Avatar src={user.photoURL} alt={`user-${user.userID}`} />
                    <StyledFiPlus size={64} />
                  </AddFriend>
                ) : (
                  <AddFriend
                    isUser
                    onClick={(ev) => openSnackbar("Can't add yourself!")}
                  >
                    <Avatar src={user.photoURL} alt={`user-${user.userID}`} />
                    <StyledFiPlus size={64} />
                  </AddFriend>
                );
              })}
            {/* return (
                  user.userID != currentUser && (
                    <AddFriend onClick={(ev) => addFriend(user.userID)}>
                      <Avatar src={user.photoURL} alt={`user-${user.userID}`} />
                      <StyledFiPlus size={64} />
                    </AddFriend>
                  )
                );
              })} */}
            {/* <InviteFriend onClick={() => console.log("Invite a friend!")}>
              <FiPlus size={64} color={THEMES.White} />
            </InviteFriend> */}
          </ChatUsers>
        </TopChat>
      )}
      <ChatBox url={URL_ID} />
    </PageContainer>
  );
};

// ##################### CHAT USERS AND MOVIE TITLE ###########################

const TopChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 1%;
  margin: 2% 0;
  border-radius: 12px;
  background-color: ${THEMES.Primary};
`;

const Text = styled.h1`
  font-size: 1.8rem;
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
  /* margin: 0 20px; */
  width: 95%;

  align-items: center;
  /* border: 5px solid goldenrod; */
  margin: 0 auto;
  margin-top: 10px;

  & p {
    margin-left: 6px;
    font-size: 1.3rem;
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
  max-width: 90px;
  height: auto;
  object-fit: cover;
  user-select: none;
  /* position: relative;
  z-index: 7; */
`;

const InviteFriend = styled.button`
  position: relative;
  width: 85px;
  height: 85px;
  margin: 0 1%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${THEMES.BlackCoffee};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${THEMES.Blue};
    border: 3px solid ${THEMES.White};
  }
  /* border: 5px solid red; */
`;

const AddFriend = styled.button`
  position: relative;
  /* border: 1px solid red; */
  overflow: hidden;
  margin: 0 1%;
  cursor: ${(props) => (props.isUser ? "default" : "pointer")};
  background-color: transparent;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:hover {
    & ${StyledFiPlus} {
      opacity: ${(props) => (props.isUser ? "0" : "0.9")};
      /* z-index: 8; */
    }
    & ${Avatar} {
      filter: ${(props) =>
        props.isUser ? "brightness(100%)" : "brightness(70%)"};
      /* filter: brightness(70%); */
    }
  }
`;

export default GroupChat;
