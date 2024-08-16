import { useEffect } from "react";
import App from "../../App";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePopup from "../../hooks/usePopup";
import styled from "styled-components";

const TopBar = styled.div`
  top: 0px;
  height: 50px;
  width: 100%;
  position: fixed;
  background-color: white;
  & h1{
    margin: 0px;
  }
`

function Root() {
    interface IState {
        displayName: string,
        email: string,
        token: string 
      }
    const userName = useSelector((state : IState) => state.displayName)
    const navigate = useNavigate();
    const {togglePopup, Popup} = usePopup()
    useEffect(() => {
      if (!userName) {
        navigate("/signin");
      }
    }, [userName]);
    return (
      <>
        {/* <div style={{position:'fixed'}}>
          <button onClick={() => togglePopup('Неверное имя пользователя или пароль!', 'error')}>Ошибка!</button>
          <button onClick={() => togglePopup('Пользователь с таким e-mail уже зарегистрирован!', 'warning')}>Предупреждение!</button>
          <button onClick={() => togglePopup('Вы успешно авторизовались!', 'success')}>Все хорошо!</button>
        </div> */}
        {userName ? <TopBar><h1>Welcome, {userName}</h1></TopBar> : <TopBar><h1>Welcome, guest!</h1></TopBar> }
        <Popup />
        <App />
      </>
    );
  }
  
  export default Root;