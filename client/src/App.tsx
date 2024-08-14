import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';

function App() {
  interface IState {
    displayName: string,
    email: string,
    token: string 
  }
  const userName = useSelector((state : IState) => state.displayName)
  return (
    <>
      {userName && <><Outlet /> <Header /></>}
    </>
  );
}

export default App;
