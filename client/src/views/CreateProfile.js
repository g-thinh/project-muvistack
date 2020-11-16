import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import { Avatar, AvatarStyle, allOptions } from "avataaars";
import { THEMES } from "../components/THEMES";
import { Redirect } from "react-router-dom";

import { AvatarContext } from "../components/AvatarContext";
import { AuthContext } from "../components/AuthContext";
import { db, auth } from "../services/firebase";

const CreateProfile = () => {
  const { appUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState(null);
  const [displayName, setDisplayName] = React.useState("");
  const [bioText, setBioText] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  function handleDisplayNameChange(event) {
    setDisplayName(event.target.value);
  }

  function handleBioTextChange(event) {
    setBioText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (displayName && bioText) {
        console.log("Created new user!");
        db.ref("users")
          .child(appUser.uid)
          .update({
            displayName: displayName,
            bioText: bioText,
            photoURL: "https://avataaars.io/?avatarStyle=Circle",
            profileSetup: true,
            friends: { bool: true },
          });
        setRedirect(true);
      } else {
        setError("Please fill in the form fields!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return redirect ? (
    <Redirect to="/create-avatar" />
  ) : (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Please fill out the form to create your new account</Title>
        <InputContainer>
          <Input
            placeholder="Write your display name..."
            name="display-name"
            type="text"
            key="displayName"
            onChange={handleDisplayNameChange}
            value={displayName}
          />
          <InputBio
            placeholder="Write a short bio..."
            name="bio-text"
            key="bioDescription"
            onChange={handleBioTextChange}
            value={bioText}
            type="text"
          />
        </InputContainer>
        <ButtonContainer>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <Button type="submit">
            <span>Submit</span>
          </Button>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
};

const Form = styled.form`
  background-color: white;
  padding: 20px;
  min-height: 70vh;
  width: 50%;
  border-radius: 12px;

  @media (max-width: 850px) {
    height: 100vh;
    width: 100%;
    border-radius: 0px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 3.3rem;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  margin: 5px 0;
  padding-left: 12px;

  &::placeholder {
    color: #9e9e9e;
    opacity: 0.75;
  }
`;

const InputBio = styled.textarea`
  width: 300px;
  height: 5rem;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  margin: 5px 0;
  padding: 5px 12px;

  &::placeholder {
    color: #9e9e9e;
    opacity: 0.75;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Button = styled.button`
  width: 300px;
  height: 4.3rem;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${THEMES.Primary};
  color: white;
  border: 2px solid ${THEMES.Primary};
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
    border: 2px solid ${THEMES.Secondary};
    background-color: ${THEMES.Secondary};
    color: white;
    /* transform: scale(1.1); */
  }

  &:hover {
    color: white;
    border: 2px solid ${THEMES.Secondary};
    background-color: ${THEMES.Secondary};
    /* transform: scale(1.1); */
  }

  /* &:active {
    transform: scale(1.1);
  } */
`;

const ErrorText = styled.p`
  margin: 10px 0;
  color: red;
`;

export default CreateProfile;
