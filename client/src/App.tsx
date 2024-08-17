import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import styled from "styled-components";
import TopBar from "./components/TopBar/TopBar";

const OutletContainer = styled.div`
  padding-bottom: 100px;
  padding-top: 140px;
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
      {userName && 
      <> 
        <TopBar></TopBar>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
        <Header />
      </>}
    </>
  );
}

export default App;
