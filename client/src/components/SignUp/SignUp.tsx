import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase'
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import usePopup from '../../hooks/usePopup';
import firebaseErrorToText from '../../helpers/firebaseErrorToText';


const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FFFFFF;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #F0F8FF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #B0E0E6; 
  border-radius: 4px;
  font-size: 16px;
`;

const FormControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #98FB98; 
    border: none;
    border-radius: 4px;
    color: black;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #90EE90;
    }
  }

  & p {
    margin-top: 10px;
    color: black;
    font-size: 14px;

    & a {
      color: #000;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
function SignUp () {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string 
  }
  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userName = useSelector((state : IState) => state.displayName)
  const {Popup, togglePopup} = usePopup()
  // Make stronger protection in future
  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName]);
  interface IUserCredentials {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined 
  }

  async function handleSignUp (e : React.FormEvent<HTMLFormElement>) : Promise<void> {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((resp) => {
        resp.user.getIdToken().then((res) => {
          const token = res
          const userId : string | undefined = auth.currentUser?.uid
          const userCredentials :IUserCredentials = {displayName, email, token, userId}
          dispatch(login(userCredentials))
        })
        // const {email, accessToken, uid} = resp.user
        updateProfile(resp.user, {displayName})
        navigate("/");
      }).catch((error) => togglePopup(firebaseErrorToText(error), 'error'));
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
  <><FormContainer>
      <StyledForm onSubmit={handleSignUp}>
        <Input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Name" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />
        <FormControls>
          <button type="submit">Sign In</button>
          <p>Already have an account? Click <NavLink to={'/signin'}>here</NavLink></p>
        </FormControls>
      </StyledForm>
    </FormContainer><Popup /></>
  );
};

export default SignUp;