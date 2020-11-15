import React from "react";
import styled from "styled-components";
import Avatar from "avataaars";
import { randomFeature, FEATURES } from "./FEATURES";
import { THEMES } from "../THEMES";
import Wave from "../UI/Wave";

const UserAvatar = ({ styles }) => {
  // ############################### AVATAR FEATURES #########################
  const [topType, setTopType] = React.useState(randomFeature("topType"));
  const [accessoriesType, setAccessoriesType] = React.useState(
    randomFeature("accesoriesType")
  );

  const [hairColor, setHairColor] = React.useState(randomFeature("hairColor"));
  const [facialHairType, setFacialHairType] = React.useState(
    randomFeature("facialHairType")
  );
  const [facialHairColor, setFacialHairColor] = React.useState(
    randomFeature("facialHairColor")
  );
  const [clotheType, setClotheType] = React.useState(
    randomFeature("clotheType")
  );
  const [clotheColor, setClotheColor] = React.useState(
    randomFeature("clotheColor")
  );
  const [eyeType, setEyeType] = React.useState(randomFeature("eyeType"));
  const [eyebrowType, setEyebrowType] = React.useState(
    randomFeature("eyebrowType")
  );

  const [mouthType, setMouthType] = React.useState(randomFeature("mouthType"));
  const [skinColor, setSkinColor] = React.useState(randomFeature("skinColor"));

  let baseURL = `https://avataaars.io/?avatarStyle=Circle&topType=${topType}&accessoriesType=${accessoriesType}&hairColor=${hairColor}&facialHairType=${facialHairType}&facialHairColor=${facialHairColor}&clotheType=${clotheType}&clotheColor=${clotheColor}&eyeType=${eyeType}&eyebrowType=${eyebrowType}&mouthType=${mouthType}&skinColor=${skinColor}`;

  const [url, setUrl] = React.useState(baseURL);

  // ############################# FUNCTIONS ################################
  function changeTop(feature, type) {
    console.log(`Current ${feature}:`, type);
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    console.log("The current index is:", currentIndex);
    console.log("The current length is:", length);

    if (currentIndex + 1 > length || currentIndex === -1) {
      // console.log("Back to 0", Arr[1]);
      setTopType(Arr[0]);
    } else {
      // console.log("New Top:", Arr[currentIndex + 1]);
      setTopType(Arr[currentIndex + 1]);
    }
    setUrl(baseURL);
  }

  function changeAccesories(feature, type) {
    console.log(`Current ${feature}:`, type);
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    console.log("The current index is:", currentIndex);
    console.log("The current length is:", length);

    if (currentIndex + 1 > length || currentIndex === -1) {
      // console.log("Back to 0", Arr[1]);
      setAccessoriesType(Arr[0]);
    } else {
      // console.log("New Top:", Arr[currentIndex + 1]);
      setAccessoriesType(Arr[currentIndex + 1]);
    }
    setUrl(baseURL);
  }

  function changeHairColor(feature, type) {
    console.log(`Current ${feature}:`, type);
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    console.log("The current index is:", currentIndex);
    console.log("The current length is:", length);

    if (currentIndex + 1 > length || currentIndex === -1) {
      // console.log("Back to 0", Arr[1]);
      setHairColor(Arr[0]);
    } else {
      // console.log("New Top:", Arr[currentIndex + 1]);
      setHairColor(Arr[currentIndex + 1]);
    }
    setUrl(baseURL);
  }

  function randomize() {
    setTopType(randomFeature("topType"));
    setAccessoriesType(randomFeature("accesoriesType"));
    setEyebrowType(randomFeature("eyebrowType"));
    setHairColor(randomFeature("hairColor"));
    setFacialHairType(randomFeature("facialHairType"));
    setFacialHairColor(randomFeature("facialHairColor"));
    setClotheType(randomFeature("clotheType"));
    setClotheColor(randomFeature("clotheColor"));
    setEyeType(randomFeature("eyeType"));
    setEyebrowType(randomFeature("eyebrowType"));
    setMouthType(randomFeature("mouthType"));
    setSkinColor(randomFeature("skinColor"));
    setUrl(baseURL);
  }

  // ############################# RETURN #############################

  React.useEffect(() => {
    console.log("AVATAR MAKER MOUNTED");
    console.log("FEATURES:", FEATURES);
  }, []);

  return (
    <Wrapper>
      <Top>
        <CircleButton onClick={() => changeHairColor("hairColor", hairColor)}>
          <span>Hair Color</span>
        </CircleButton>
      </Top>
      <img src={url} alt="user-avatar" />
      <Button onClick={() => randomize()}>
        <span>Random</span>
      </Button>
      <Button onClick={() => changeTop("topType", topType)}>
        <span>Top</span>
      </Button>
      <Button
        onClick={() => changeAccesories("accesoriesType", accessoriesType)}
      >
        <span>Accesories</span>
      </Button>
      <Button onClick={() => changeHairColor("hairColor", hairColor)}>
        <span>Hair Color</span>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const Top = styled.div``;

const CircleButton = styled.button``;

const Button = styled.button`
  margin-top: 10px;
  width: 250px;
  height: 3.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Blue};
  color: white;
  border: 2px solid ${THEMES.Blue};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 20px;
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

  &:active {
    transform: scale(1.1);
  }
`;

export default UserAvatar;
