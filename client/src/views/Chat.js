import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { THEMES } from "../components/THEMES";
import Spinner from "../components/UI/Spinner";
import {
  requestConvos,
  receiveConvos,
  requestConvosError,
} from "../store/actions";

const Chat = () => {
  const dispatch = useDispatch();
  const CONVOS = useSelector((state) => state.CHAT.currentConvos);
  const LOADING = useSelector((state) => state.CHAT.status);
  const { appUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  async function fetchMovieInfo(id) {
    console.log(`FETCHING ${id}`);
    const response = await fetch(`/movies/${id}`);
    const data = await response.json();
    return data;
  }

  function fetchConvos() {
    // Also must check if there are enough users in chat
    dispatch(requestConvos());
    let convos = [];
    try {
      db.ref("matches").once("value", (snapshot) => {
        const data = snapshot.val();
        snapshot.forEach((snap) => {
          let users = Object.values(snap.val().users);
          // console.log("MOVIE!", users);
          if (users.length > 1) {
            convos.push(snap.val());
          }
        });
        // console.log("THE RESULTS CONVOS", convos);
        dispatch(receiveConvos(convos));
        // dispatch(receiveConvos(data));
      });
    } catch (error) {
      dispatch(requestConvosError());
    }
  }

  React.useEffect(() => {
    fetchConvos();
  }, []);

  if (LOADING === "loading") {
    return <Spinner />;
  }

  return (
    <PageContainer>
      {!CONVOS ? (
        <Text>No Chats</Text>
      ) : (
        <>
          <Text>The Current Convos</Text>
          <ConvoList>
            {CONVOS.map((convo) => {
              console.log("convo", convo);
              return (
                <li>
                  <StyledLink to={`/chat/${convo.id}`}>
                    <ConvoCard>
                      <img src={convo.posterURL} alt={`chat-${convo.id}`} />
                      <CardDesc>
                        <h1>{convo.title}</h1>
                      </CardDesc>
                    </ConvoCard>
                  </StyledLink>
                </li>
              );
            })}
          </ConvoList>
        </>
      )}
    </PageContainer>
  );
};
const Text = styled.h1`
  font-size: 32px;
  color: black;
  margin: 10px;
`;

const ConvoList = styled.ul`
  width: 95%;
  height: auto;
  /* border: 5px solid green; */
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;

  & li {
    width: 100%;
    margin: 5px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ConvoCard = styled.button`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border: 2px solid #d9d9d9d9;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${THEMES.Primary};
    border: 2px solid ${THEMES.BlackCoffee};
  }

  & img {
    width: 120px;
    height: 150px;
    border-radius: 12px;
  }
`;

const CardDesc = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
`;

export default Chat;
