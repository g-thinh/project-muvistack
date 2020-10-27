import React from "react";
import styled from "styled-components";
import { THEMES } from "../components/THEMES";
import PageContainer from "./PageContainer";
import { AuthContext } from "../components/AuthContext";
import { auth, db } from "../services/firebase";
import Cards from "../components/Cards";
import { getUser } from "../helpers/auth";
import Spinner from "../components/UI/Spinner";

const Profile = () => {
  const { appUser } = React.useContext(AuthContext);
  const [displayName, setDisplayName] = React.useState("");
  const [bioText, setBioText] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("[Profile.js] is mounted...");
    console.log("[Profile.js] current user is", appUser);
    const fetchData = async () => {
      const response = await db
        .ref("users")
        .child(appUser.uid)
        .once("value", (snapshot) => {
          const data = snapshot.val();
          setDisplayName(data.displayName);
          setBioText(data.bioText);
          setAvatarURL(data.photoURL);
          console.log("[Profile.js] user data is", data);
        });
      return response;
    };

    if (appUser) {
      fetchData();
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageContainer background="light">
      <ProfileContainer>
        <ProfilePicture>
          <img src={avatarURL} alt="test-profile-pic" />
        </ProfilePicture>
        <ProfileDesc>
          <DisplayName>{displayName}</DisplayName>
          <DescText>
            {/* Avid moviegoer, typical netflix binger, casual bingo player. */}
            {bioText}
          </DescText>
        </ProfileDesc>
      </ProfileContainer>
      <Cards />
    </PageContainer>
  );
};

// const PageContainer = styled.div`
//   flex: 9;
//   position: relative;
//   display: flex;
//   flex-flow: column;
//   justify-content: center;
//   align-items: center;
//   /* min-height: 100vh; */
//   width: 100%;
//   /* border: 5px solid red; */
//   /* margin-top: 5vh; */
// `;

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
    @media (max-width: 426px) {
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
  margin: 1vh 0;
`;

const DisplayName = styled.h1`
  color: ${THEMES.BlackCoffee};
  font-size: 44px;
  text-align: center;
  user-select: none;

  @media (max-width: 426px) {
    font-size: 34px;
  }
`;

const DescText = styled.p`
  color: gray;
  font-size: 24px;
  text-align: center;
  margin-top: 12px;
  user-select: none;

  @media (max-width: 426px) {
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
