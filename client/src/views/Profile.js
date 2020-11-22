import React from "react";
import styled from "styled-components";
import { THEMES } from "../components/THEMES";
import PageContainer from "./PageContainer";
import { AuthContext } from "../components/AuthContext";
import { auth, db } from "../services/firebase";
import Cards from "../components/Cards";
import { useSelector, useDispatch } from "react-redux";
import {
  requestCurrentUser,
  receiveCurrentUser,
  requestCurrentUserError,
} from "../store/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.USER.profile);
  const { appUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("[Profile.js] is mounted...");

    const fetchData = async () => {
      dispatch(requestCurrentUser());
      // console.log("appUser", appUser);
      try {
        const response = await db
          .ref("users")
          .child(appUser.uid)
          .once("value", (snapshot) => {
            const data = snapshot.val();
            dispatch(receiveCurrentUser(data));
            // console.log("[Profile.js] user data is", data);
          });
        return response;
      } catch (error) {
        dispatch(requestCurrentUserError());
      }
    };

    if (appUser) {
      // console.log("[Profile.js] current user is", appUser);
      fetchData();
    }
  }, [appUser]);

  return (
    <PageContainer background="light">
      <ProfileContainer>
        <ProfilePicture>
          <img src={USER.photoURL} alt="test-profile-pic" />
        </ProfilePicture>
        <ProfileDesc>
          <DisplayName>{USER.displayName}</DisplayName>
          <DescText>{USER.bioText}</DescText>
        </ProfileDesc>
      </ProfileContainer>
      <Cards />
    </PageContainer>
  );
};

const ProfileContainer = styled.div`
  width: 70%;
  display: flex;
  min-height: 35vh;
  /* flex-flow: column wrap; */
  justify-content: center;
  align-items: center;
  /* border: 3px dashed red; */
  padding: 1vh 0;

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
    width: 75%;
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
  font-size: 2.7rem;
  text-align: center;
  user-select: none;

  @media (max-width: 426px) {
    font-size: 34px;
  }
`;

const DescText = styled.p`
  color: gray;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 12px;
  user-select: none;

  @media (max-width: 426px) {
    font-size: 18px;
    margin-top: 8px;
  }
`;

export default Profile;
