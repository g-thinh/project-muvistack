import React from "react";
import styled from "styled-components";
import { THEMES } from "../../THEMES";

const Wave = () => {
  // let divHeight;
  // if (height) {
  //   divHeight = height + "vh";
  // } else {
  //   divHeight = null;
  // }

  // const Bottom = styled.div`
  //   height: ${divHeight};
  //   width: 100%;
  //   background-color: ${THEMES.Primary};
  // `;

  return (
    <>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={THEMES.Primary}
          fillOpacity="1"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,90.7C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          // d="M0,160L60,186.7C120,213,240,267,360,245.3C480,224,600,128,720,122.7C840,117,960,203,1080,224C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </Svg>
      {/* {divHeight ? <Bottom>{children}</Bottom> : null} */}
    </>
  );
};

const Svg = styled.svg`
      transform: translateY(10px);
`;

export default Wave;
