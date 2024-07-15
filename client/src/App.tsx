import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';

function App() {
  const [auth, setAuth] = useState<boolean>(false)
  return (
    <>
      <button onClick={() => setAuth(prev => !prev)}>Sign In</button>
      <Outlet />
      <Header />
    </>
  );
}

export default App;
