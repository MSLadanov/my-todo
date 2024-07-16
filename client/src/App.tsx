import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/actions/authActions';
import './App.css';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  interface IState {
    displayName: string,
    email: string,
    token: string 
  }
  const userName = useSelector((state : IState) => state.displayName)
  return (
    <>
      {userName ? <h1>Welcome, {userName}</h1> : <h1>Welcome, guest!</h1>}
      {!userName ? <SignIn /> : <><Outlet /> <Header /></>}
    </>
  );
}

export default App;
