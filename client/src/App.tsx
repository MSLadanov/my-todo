import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import styled from "styled-components";
import TopBar from "./components/TopBar/TopBar";
import usePopup from "./hooks/usePopup";
import Loader from "./components/Loader/Loader";

const OutletContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 100px;
  padding-top: 100px;
`

function App() {
  interface IState {
    displayName: string,
    email: string,
    token: string 
  }
  const { togglePopup, Popup } = usePopup()
  const userName = useSelector((state : IState) => state.displayName)
  return (
    <>
      {userName && 
      <> 
        <TopBar></TopBar>
        <OutletContainer>
          <div>
            <button onClick={() => togglePopup('Неверное имя пользователя или пароль!', 'error')}>Ошибка!</button>
            <button onClick={() => togglePopup('Пользователь с таким e-mail уже зарегистрирован!', 'warning')}>Предупреждение!</button>
            <button onClick={() => togglePopup('Вы успешно авторизовались!', 'success')}>Все хорошо!</button>
          </div>
          <Loader />
          <Outlet />
        </OutletContainer>
        <Header />
        <Popup />
      </>}
    </>
  );
}

export default App;
