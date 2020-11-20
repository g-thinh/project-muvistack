import React from "react";
import styled from "styled-components";
import Backdrop from "../UI/Backdrop";
import { THEMES } from "../THEMES";
import { Redirect } from "react-router-dom";
import { PartyPopper } from "../../assets";
import { FiXCircle, FiMessageCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const MatchedModal = (props) => {
  const dispatch = useDispatch();

  const MOVIE_INFO = useSelector((state) => state.MOVIE);
  const closeHandler = props.close;
  const [toggleRedirect, setToggleRedirect] = React.useState(false);

  return (
    <>
      {toggleRedirect && (
        <Redirect to={`/chat/${MOVIE_INFO.currentMatch.movieID}`} />
      )}
      <Backdrop show={props.show} closeHandler={closeHandler} />
      {props.show ? (
        <Modal>
          <Content>
            <h1>You have Matched!</h1>
            <p>{MOVIE_INFO.currentMatch.movieTitle}</p>
            <Img src={PartyPopper} alt="confirmed-match" />
            <p>Keep matching or go to the new chat!</p>
            <Buttons>
              <Button
                onClick={(ev) => {
                  console.log(
                    "Redirecting to",
                    MOVIE_INFO.currentMatch.movieID
                  );
                  setToggleRedirect(true);
                  setTimeout(() => {
                    dispatch(closeHandler(false));
                  }, 500);
                }}
              >
                <FiMessageCircle size={32} color="dodgerblue" />
              </Button>
              <Button onClick={(ev) => dispatch(closeHandler(false))}>
                <FiXCircle size={32} color="red" />
              </Button>
            </Buttons>
          </Content>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  align-self: center;
  justify-self: center;
  z-index: 8;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  width: 500px;
  height: auto;
  background: ${THEMES.Primary};
  & h1 {
    color: ${THEMES.White};
    font-size: 44px;
  }
`;

const Img = styled.img`
  width: 30%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  width: 80%;
`;

const Button = styled.button`
  border: 1px solid #d9d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  background-color: ${THEMES.White};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 8px;

  &:hover {
    transform: scale(1.1);
  }
`;

export default MatchedModal;
