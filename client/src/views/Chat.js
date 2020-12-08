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
import { Uh } from "../assets";

const moment = require("moment");

const Chat = () => {
  const dispatch = useDispatch();
  const CONVOS = useSelector((state) => state.CHAT.currentConvos);
  const LOADING = useSelector((state) => state.CHAT.status);
  const { appUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  async function fetchMovieInfo(id) {
    // console.log(`FETCHING ${id}`);
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
        // console.log(data);
        snapshot.forEach((snap) => {
          let users = Object.values(snap.val().users);
          // console.log("MOVIE!", users);
          if (users.length > 1 && users.includes(appUser.uid)) {
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
    window.scrollTo(0, 0);
    fetchConvos();
  }, []);

  if (LOADING === "loading") {
    return <Spinner />;
  }

  return (
    <PageContainer>
      {CONVOS.length < 1 ? (
        <>
          <Text>Oof... No matches yet...</Text>
          <Image src={Uh} alt="no-matches" />
          <Start to="/movies">
            <span>Start Matching!</span>
          </Start>
        </>
      ) : (
        <>
          <Text>The Current Convos</Text>
          <ConvoList>
            {CONVOS.map((convo) => {
              // console.log("convo", convo);
              return (
                <li>
                  <StyledLink to={`/chat/${convo.id}`}>
                    <ConvoCard>
                      <img src={convo.posterURL} alt={`chat-${convo.id}`} />
                      <Content>
                        <CardDesc>
                          <h1>{convo.title}</h1>
                        </CardDesc>
                        <CardDate>
                          {convo.dates ? (
                            <Date>
                              <span>Next Watch Date: </span>{" "}
                              {moment(convo.dates.date).format("MMMM Do")} at{" "}
                              {moment(convo.dates.date).format("hh:mm A")}
                            </Date>
                          ) : (
                            <Date>
                              <span>No Date Set</span>
                            </Date>
                          )}
                        </CardDate>
                      </Content>
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
  font-size: 2.5rem;
  color: black;
  margin: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
`;

const CardDate = styled.div``;

const Date = styled.p`
  font-weight: 400;
  font-size: 1.3rem;
  margin: 5% 0;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
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

    & ${Date} {
      color: ${THEMES.White};
    }
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
  font-size: 1.8rem;

  @media (max-width: 1000px) {
    font-size: 1.3rem;
  }
`;

const Image = styled.img`
  margin-top: 1%;
  margin-bottom: 5%;
`;

const Start = styled(Link)`
  width: auto;
  height: 4.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Blue};
  color: white;
  border: 2px solid ${THEMES.Blue};
  outline: none;
  display: flex;
  padding: 0 2%;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 1.3rem;
    font-weight: 400;
  }

  &:focus {
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.SecondaryBlue};
    background-color: ${THEMES.SecondaryBlue};
    /* transform: scale(1.1); */
  }
`;

export default Chat;
