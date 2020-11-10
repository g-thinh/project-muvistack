import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Backdrop = (props) => {
  const dispatch = useDispatch();
  const closeHandler = props.closeHandler;

  return props.show ? (
    <BackdropContainer
      onClick={(ev) => dispatch(closeHandler(!props.show))}
    ></BackdropContainer>
  ) : null;
};

const BackdropContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 7;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
