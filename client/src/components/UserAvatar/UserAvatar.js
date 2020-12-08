import React from "react";
import styled from "styled-components";
import { randomFeature, FEATURES } from "./FEATURES";
import { THEMES } from "../THEMES";
import { auth, db } from "../../services/firebase";
import { useHistory } from "react-router-dom";

const UserAvatar = (props) => {
  const history = useHistory();
  const [user, setUser] = React.useState(auth().currentUser);

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
    // console.log(`Current ${feature}:`, type);
    let Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    // console.log("The current index is:", currentIndex);
    // console.log("The current length is:", length);

    if (currentIndex + 1 > length || currentIndex === -1) {
      // console.log("Back to 0", Arr[1]);
      setTopType(Arr[0]);
    } else {
      // console.log("New Top:", Arr[currentIndex + 1]);
      setTopType(Arr[currentIndex + 1]);
    }
  }

  function changeAccesories(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setAccessoriesType(Arr[0]);
    } else {
      setAccessoriesType(Arr[currentIndex + 1]);
    }
  }

  function changeHairColor(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    if (currentIndex + 1 > length || currentIndex === -1) {
      setHairColor(Arr[0]);
    } else {
      setHairColor(Arr[currentIndex + 1]);
    }
  }

  function changeFacialHairColor(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setFacialHairColor(Arr[0]);
    } else {
      setFacialHairColor(Arr[currentIndex + 1]);
    }
  }

  function changeClotheColor(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setClotheColor(Arr[0]);
    } else {
      setClotheColor(Arr[currentIndex + 1]);
    }
  }

  function changeSkinColor(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setSkinColor(Arr[0]);
    } else {
      setSkinColor(Arr[currentIndex + 1]);
    }
  }

  function changeFacialHair(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setFacialHairType(Arr[0]);
    } else {
      setFacialHairType(Arr[currentIndex + 1]);
    }
  }

  function changeClothe(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setClotheType(Arr[0]);
    } else {
      setClotheType(Arr[currentIndex + 1]);
    }
  }

  function changeEye(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setEyeType(Arr[0]);
    } else {
      setEyeType(Arr[currentIndex + 1]);
    }
  }

  function changeEyebrow(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);

    if (currentIndex + 1 > length || currentIndex === -1) {
      setEyebrowType(Arr[0]);
    } else {
      setEyebrowType(Arr[currentIndex + 1]);
    }
  }

  function changeMouth(feature, type) {
    const Arr = FEATURES[feature];
    const length = Arr.length - 1;
    let currentIndex = Arr.indexOf(type);
    if (currentIndex + 1 > length || currentIndex === -1) {
      setMouthType(Arr[0]);
    } else {
      setMouthType(Arr[currentIndex + 1]);
    }
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
    // setUrl(baseURL);
  }

  function updateAvatar() {
    db.ref(`users/${user.uid}`).update({ photoURL: url });
  }

  // ############################# RETURN #############################

  React.useEffect(() => {
    // console.log("AVATAR MAKER MOUNTED");
    // console.log("FEATURES:", FEATURES);
    setUrl(baseURL);
  }, [
    topType,
    accessoriesType,
    hairColor,
    facialHairType,
    facialHairColor,
    clotheType,
    clotheColor,
    eyeType,
    eyebrowType,
    mouthType,
    skinColor,
  ]);

  return (
    <Wrapper>
      <Top>
        <Side>
          <CircleButton
            color={hairColor}
            onClick={() => changeHairColor("hairColor", hairColor)}
          />
          <CircleButton
            color={facialHairColor}
            onClick={() =>
              changeFacialHairColor("facialHairColor", facialHairColor)
            }
          />
        </Side>
        <Middle>
          <Avatar src={url} alt="user-avatar" />
        </Middle>
        <Side>
          <CircleButton
            color={clotheColor}
            onClick={() => changeClotheColor("clotheColor", clotheColor)}
          />
          <CircleButton
            color={skinColor}
            onClick={() => changeSkinColor("skinColor", skinColor)}
          />
        </Side>
      </Top>

      <Grid>
        <Button random onClick={() => randomize()}>
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
        <Button
          onClick={() => changeFacialHair("facialHairType", facialHairType)}
        >
          <span>Facial Hair</span>
        </Button>
        <Button onClick={() => changeClothe("clotheType", clotheType)}>
          <span>Clothing</span>
        </Button>
        <Button onClick={() => changeEye("eyeType", eyeType)}>
          <span>Eye</span>
        </Button>
        <Button onClick={() => changeEyebrow("eyebrowType", eyebrowType)}>
          <span>Eyebrow</span>
        </Button>
        <Button onClick={() => changeMouth("mouthType", mouthType)}>
          <span>Mouth</span>
        </Button>
      </Grid>

      <Submit
        onClick={() => {
          updateAvatar();
          history.push("/profile");
        }}
      >
        <span>Submit</span>
      </Submit>
    </Wrapper>
  );
};

// ###################### CSS FOR LAYOUT ##########################

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const Top = styled.div`
  /* border: 5px solid red; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
const Middle = styled.div`
  flex: 8;
  display: flex;
  justify-content: center;
`;
const Side = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 1px dashed green; */

  & :first-child {
    transform: translateY(-20px);
  }

  & :last-child {
    transform: translateY(20px);
    /* width: 50px; */
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  /* gap: 30px 30px; */
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  /* border: 5px solid red; */
  justify-items: center;
  align-items: center;
  gap: 2%;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: repeat(4, auto);
    grid-gap: 4%;
  }
`;

// ############################ CSS FOR ELEMENTS #######################

const Avatar = styled.img`
  width: 100%;
`;

const CircleButton = styled.button`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const Button = styled.button`
  /* margin-top: 10px; */
  width: 70%;
  height: 2.7rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => (props.random ? THEMES.Primary : THEMES.Blue)};
  color: white;
  border: 2px solid ${(props) => (props.random ? THEMES.Primary : THEMES.Blue)};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 1.3rem;
    font-weight: 400;
  }

  &:focus {
    border: 2px solid
      ${(props) => (props.random ? THEMES.Secondary : THEMES.SecondaryBlue)};
    background-color: ${(props) =>
      props.random ? THEMES.Secondary : THEMES.SecondaryBlue};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid
      ${(props) => (props.random ? THEMES.Secondary : THEMES.SecondaryBlue)};
    background-color: ${(props) =>
      props.random ? THEMES.Secondary : THEMES.SecondaryBlue};
    /* transform: scale(1.1); */
  }

  &:active {
    transform: scale(1.1);
  }
`;

const Submit = styled.button`
  margin-top: 30px;
  width: 320px;
  height: 3.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.BlackCoffee};
  color: white;
  border: 2px solid ${THEMES.BlackCoffee};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-size: 1.5rem;
    font-weight: 400;

    @media (max-width: 1000px) {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }

  &:focus {
    border: 2px solid ${THEMES.SecondaryBlack};
    background-color: ${THEMES.SecondaryBlack};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.SecondaryBlack};
    background-color: ${THEMES.SecondaryBlack};
    /* transform: scale(1.1); */
  }

  &:active {
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    margin-top: 12%;
    width: 200px;
    height: 2.7rem;
  }
`;

export default UserAvatar;
