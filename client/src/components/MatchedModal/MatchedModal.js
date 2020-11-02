import React from "react";
import styled from "styled-components";
import Backdrop from "../UI/Backdrop";
import { THEMES } from "../THEMES";
import { Redirect } from "react-router-dom";
import { PartyPopper } from "../../assets";
import { FiXCircle, FiMessageCircle } from "react-icons/fi";

const MatchedModal = (props) => {
  const [toggleRedirect, setToggleRedirect] = React.useState(false);

  return (
    <>
      {toggleRedirect && <Redirect to="/chat" />}
      <Backdrop show={props.show} closeHandler={props.close} />
      {props.show ? (
        <Modal>
          <h1>You have Matched!</h1>
          <Img src={PartyPopper} alt="confirmed-match" />
          <p>Keep matching or go to the new chat!</p>
          <Buttons>
            <Button onClick={() => setToggleRedirect(true)}>
              <FiMessageCircle size={32} color="dodgerblue" />
            </Button>
            <Button onClick={props.close}>
              <FiXCircle size={32} color="red" />
            </Button>
          </Buttons>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  /* border: 2px solid red; */
  position: fixed;
  align-self: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  z-index: 5000;
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
