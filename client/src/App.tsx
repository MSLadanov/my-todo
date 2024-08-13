import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import styled from "styled-components";

const AppDiv = styled.div`
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
      {userName && <AppDiv><Outlet /> <Header /></AppDiv>}
    </>
  );
}

export default App;
