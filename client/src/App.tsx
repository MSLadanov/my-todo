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
  const user = useSelector((state : IState) => state.displayName)
  const dispatch = useDispatch()
  return (
    <>
      {user ? <h1>Welcome, {user}</h1> : <h1>Welcome, guest!</h1>}
      <SignIn />
      <SignUp />
      {user && <><Outlet /> <Header /></>}
    </>
  );
}

export default App;
