import React from "react";
import styled from "styled-components";
import Wave from "../UI/Wave";
import {THEMES} from "../THEMES";

const Footer = ({height,children}) => {

  let divHeight;
  if (height) {
    divHeight = height + "vh";
  } else {
    divHeight = null;
  }

  const Bottom = styled.div`
    position: relative;
    z-index: 2;
    height: ${divHeight};
    width: 100%;
    background-color: ${THEMES.Primary};
  `;

  return (
    <>
      <Wave height={height}/>
      {divHeight ? <Bottom>{children}</Bottom> : null}
    </>
  );
};


export default Footer;
