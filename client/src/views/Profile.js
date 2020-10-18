import React from "react";
import styled from "styled-components";
import { THEMES } from "../components/THEMES";
import Footer from "../components/Footer";
import { AuthContext } from "../components/AuthContext";
import { auth } from "../services/firebase";
import Cards from "../components/Cards";



const Profile = () => {
  const { appUser, authenticated } = React.useContext(AuthContext);
  auth().currentUser.updateProfile({
    displayName: "Thinh Nguyen",
    photoURL:
      "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Surprised&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  });

  return (
      <PageContainer>
        <ProfileContainer>
          <ProfilePicture>
            <img src={appUser.photoURL} alt="test-profile-pic" />
          </ProfilePicture>
          <ProfileDesc>
            <DisplayName>{appUser.displayName}</DisplayName>
            <DescText>
              Avid moviegoer, typical netflix binger, casual bingo player.
            </DescText>
          </ProfileDesc>
        </ProfileContainer>
        <Cards />
      </PageContainer>
  );
};


const PageContainer = styled.div`
  flex: 9;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; */
  width: 100%;
  /* border: 5px solid red; */
  /* margin-top: 5vh; */
`;

const ProfileContainer = styled.div`
  width: 70%;
  display: flex;
  /* flex-flow: column wrap; */
  justify-content: center;
  align-items: center;
  /* border: 3px dashed red; */
  padding: 2vh 0;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 12px;
  }
`;

const ProfilePicture = styled.div`
  flex: 4;
  display: flex;
  justify-content: flex-end;

  & img {
    @media(max-width: 426px) {
      width: 180px;
    }
  }

  
`;

const ProfileDesc = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;


`;

const DisplayName = styled.h1`
  color: ${THEMES.BlackCoffee};
  font-size: 44px;
  text-align: center;

  @media(max-width: 426px) {
    font-size: 34px;

  }
`;

const DescText = styled.p`
  color: gray;
  font-size: 24px;
  text-align: center;
  margin-top: 12px;

  @media(max-width: 426px) {
    font-size: 18px;
    margin-top: 8px;
  }
`;

const Border = styled.div`
  border-radius: cubic-bezier(0.1, 0.7, 1, 0.1);
  height: 20vh;
  width: 100%;
  background-color: ${THEMES.Primary};
`;





export default Profile;
