import React from "react";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import UserAvatar from "../components/UserAvatar";
import Wave from "../components/UI/Wave";

const CreateAvatar = () => {
  return (
    <PageContainer>
      <Text>Create an Avatar here!</Text>
      <UserAvatar />
    </PageContainer>
  );
};

const Text = styled.h1`
  font-size: 32px;
`;

export default CreateAvatar;
