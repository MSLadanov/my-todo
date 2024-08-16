import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import styled from "styled-components";

const OutletContainer = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`

function App() {
  interface IState {
    displayName: string,
    email: string,
    token: string 
  }
  const userName = useSelector((state : IState) => state.displayName)
  return (
    <>
      {userName && <> <OutletContainer><Outlet /></OutletContainer><Header /></>}
    </>
  );
}

export default App;
