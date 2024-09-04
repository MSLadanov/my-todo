import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase'
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`
const FormControls = styled.div`
  & button{
    margin-top: 10px;
  }
`

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
      }).catch((error) => console.log(error));
      console.log('User signed up');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
  <FormContainer>
    <StyledForm onSubmit={handleSignUp}>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Name" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" />
      <FormControls>
            <button type="submit">Sign In</button>
            <p>Already have an account? Click <NavLink to={'/signin'}>here</NavLink></p>
          </FormControls>    
    </StyledForm>
  </FormContainer>
  );
};

export default SignUp;