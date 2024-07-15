import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleLogin (e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User logged in');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
      return (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
        </form>
      );
}

export default SignIn