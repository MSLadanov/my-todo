import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
  background-color: #F0F8FF; /* AliceBlue */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #B0E0E6; /* PowderBlue */
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
    background-color: #98FB98; /* PaleGreen */
    border: none;
    border-radius: 4px;
    color: black;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #90EE90; /* LightGreen */
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

function SignIn() {
  interface IUserCredentials {
    displayName: string | null;
    email: string | null;
    token: string;
    userId: string | undefined;
  }

  interface IState {
    displayName: string;
    email: string;
    token: string;
    userId: string | undefined;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: IState) => state.displayName);

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((resp) => {
        resp.user.getIdToken().then((res) => {
          const displayName = resp.user.displayName;
          const email = resp.user.email;
          const userId: string | undefined = auth.currentUser?.uid;
          const token = res;
          const userCredentials: IUserCredentials = { displayName, email, token, userId };
          dispatch(login(userCredentials));
          navigate("/");
        });
      }).catch((err) => console.log(err));
      console.log('User logged in');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <FormContainer>
      <StyledForm onSubmit={handleLogin}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <FormControls>
          <button type="submit">Sign In</button>
          <p>Don't have an account yet? Click <NavLink to={'/signup'}>here</NavLink></p>
        </FormControls>
      </StyledForm>
    </FormContainer>
  );
}

export default SignIn;
