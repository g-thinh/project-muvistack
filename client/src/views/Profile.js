import React from "react";
import styled from "styled-components";
import { THEMES } from "../components/THEMES";
import PageContainer from "./PageContainer";
import { AuthContext } from "../components/AuthContext";
import { auth, db } from "../services/firebase";
import Cards from "../components/Cards";
import { getUser } from "../helpers/auth";

const Profile = () => {
  const { appUser, appUserKey } = React.useContext(AuthContext);
  const [displayName, setDisplayName] = React.useState("");
  const [bioText, setBioText] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  // auth().currentUser.updateProfile({
  //   displayName: "Thinh Nguyen",
  //   photoURL:
  //     "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Surprised&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  // });

  React.useEffect(() => {
    console.log("[Profile.js] is mounted...");
    console.log("[Profile.js] user is", appUser);
    // console.log("[Profile.js] is fetching data...");
    // console.log("appUserKey", appUser);

    // const fetchData = () => {
    //   const temp = [];
    //   try {
    //     db.ref(`users/${appUserKey}`)
    //       .once("value", (snapshot) => {
    //         snapshot.forEach((snap) => {
    //           const val = snap.val();
    //           console.log("[Profile.js]", val);
    //           // temp.push(val);
    //           setData(val);
    //         });
    //       })
    //       .then(function () {
    //         console.log("[Profile.js] now data is", data);
    //         setData(temp);
    //         setLoading(false);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchData();

    // console.log("The databased returned:", data);

    db.ref("users")
      // .orderByChild("userID")
      // .equalTo(appUser.uid)
      .child(appUserKey)
      .once("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBioText(data.bio);
          setDisplayName(data.displayName);
          setAvatarURL(data.photoURL);
        }
        // snapshot.forEach((snap) => {
        //   const data = snap.val();
        //   console.log("[DATA]", data);
        //   //temp.push(data);
        //   if (data) {
        //     setBioText(data.bio);
        //     setDisplayName(data.displayName);
        //     setAvatarURL(data.photoURL);
        //     setLoading(false);
        //   }
        // });
      });
    setLoading(false);

    console.log("after fetch...", data);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
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
`;

const DisplayName = styled.h1`
  color: ${THEMES.BlackCoffee};
  font-size: 44px;
  text-align: center;

  @media (max-width: 426px) {
    font-size: 34px;
  }
`;

const DescText = styled.p`
  color: gray;
  font-size: 24px;
  text-align: center;
  margin-top: 12px;

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
