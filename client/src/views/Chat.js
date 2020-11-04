import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  requestConvos,
  receiveConvos,
  requestConvosError,
  receiveAllConvos,
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
    dispatch(requestConvos());
    try {
      db.ref("matches").once("value", (snapshot) => {
        const data = snapshot.val();
        dispatch(receiveConvos(data));
      });
    } catch (error) {
      dispatch(requestConvosError());
    }
  }

  React.useEffect(() => {
    fetchConvos();
  }, []);

  if (LOADING === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <PageContainer>
      {!CONVOS ? (
        <Text>No Chats</Text>
      ) : (
        <ConvoList>
          {CONVOS.map((convo) => {
            return (
              <li>
                <StyledLink to={`/chat/${convo.id}`}>
                  <ConvoCard>{convo.title}</ConvoCard>
                </StyledLink>
              </li>
            );
          })}
        </ConvoList>
      )}
    </PageContainer>
  );
};
const Text = styled.h1`
  font-size: 32px;
  color: black;
`;

const ConvoList = styled.ul`
  width: 95%;
  height: auto;
  border: 5px solid green;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;

  & li {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ConvoCard = styled.button`
  width: 100%;
  height: 50px;
`;

export default Chat;
