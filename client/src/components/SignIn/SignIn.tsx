import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

function SignIn(){
  interface IUserCredentials {
    displayName: string | null,
    email: string | null,
    token: string 
  }
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleLogin (e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password).then((resp) => {
            resp.user.getIdToken().then((res) => {
              const displayName = resp.user.displayName
              const email = resp.user.email
              const token = res
              const userCredentials :IUserCredentials = {displayName, email, token}
              dispatch(login(userCredentials))
              navigate("/");
            })
          }).catch((err) => console.log(err));
          console.log('User logged in');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
      return (
      <>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Sign In</button>
        </form>
      </>
      );
}

export default SignIn