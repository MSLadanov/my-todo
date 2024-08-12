import { useEffect } from "react";
import App from "../../App";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePopup from "../../hooks/usePopup";

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
        <button onClick={() => togglePopup('Неверное имя пользователя или пароль!', 'error')}>Ошибка!</button>
        <button onClick={() => togglePopup('Пользователь с таким e-mail уже зарегистрирован!', 'warning')}>Предупреждение!</button>
        <button onClick={() => togglePopup('Вы успешно авторизовались!', 'success')}>Все хорошо!</button>
        {userName ? <h1>Welcome, {userName}</h1> : <h1>Welcome, guest!</h1>}
        <Popup />
        <App />
      </>
    );
  }
  
  export default Root;