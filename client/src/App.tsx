import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/actions/authActions';
import './App.css';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';

function App() {
  interface IState {
    user: string
  }
  const user = useSelector((state : IState) => state.user)
  const dispatch = useDispatch()
  function signIn():void{
    dispatch(login('John Doe'))
  }
  function logOut():void{
    dispatch(login(null))
  }
  return (
    <>
      {user ? <h1>Welcome, {user}</h1> : <h1>Welcome, guest!</h1>}
      <SignIn />
      {user ? <button onClick={() => logOut()}>Log Out</button> : <button onClick={() => signIn()}>Sign In</button>} 
      {user && <><Outlet /> <Header /></>}
    </>
  );
}

export default App;
