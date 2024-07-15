import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/actions/authActions';
import './App.css';
import Header from './components/Header/Header';

function App() {
  interface IState {
    user: string
  }
  const user = useSelector((state : IState) => state.user)
  const dispatch = useDispatch()
  console.log(user)
  function signIn():void{
    dispatch(login('John Doe'))
  }
  const [auth, setAuth] = useState<boolean>(false)
  return (
    <>
      <h1>{user}</h1>
      <button onClick={() => signIn()}>Sign In</button>
      <Outlet />
      <Header />
    </>
  );
}

export default App;
