import React from "react";
import styled from "styled-components";
import { THEMES } from "../components/THEMES";
import { Link } from "react-router-dom";
import { GoogleLogo } from "../assets";
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

const SignUp = () => {
  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signup(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Create an Account</Title>
        <InputContainer>
          <p>Fill in the form below to create an account.</p>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
          />
          <Input
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            type="password"
          />
        </InputContainer>
        <ButtonContainer>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <Button type="submit">
            <span>Sign up</span>
          </Button>
          <LineText>
            <span>Or</span>
          </LineText>

          <GoogleButton onClick={googleSignIn} type="button">
            <BtnLogo src={GoogleLogo} alt="google logo" />
            <span>Sign up with Google</span>
          </GoogleButton>
          {/* <p>Or</p>
          <Button type="button" onClick={githubSignIn}>
            Sign up with GitHub
          </Button> */}
        </ButtonContainer>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${THEMES.BlackCoffee};
`;

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
  margin: 5% 0;
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

const LineText = styled.h2`
  width: 300px;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
  line-height: 0.1em;
  margin: 4% 0;

  & span {
    background: #fff;
    padding: 0 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
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

const BtnLogo = styled.img`
  width: 50px;
`;

const GoogleButton = styled.button`
  width: 300px;
  height: 4.3rem;
  cursor: pointer;
  border-radius: 6px;
  background-color: white;
  color: black;
  border: 2px solid #e5e5e5;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 0 5%;
  & span {
    font-size: 20px;
    font-weight: 400;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  margin: 10px 0;
  color: red;
`;

export default SignUp;
