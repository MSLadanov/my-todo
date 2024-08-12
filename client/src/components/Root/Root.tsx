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
        <button onClick={() => togglePopup()}>Show Popup</button>
        {userName ? <h1>Welcome, {userName}</h1> : <h1>Welcome, guest!</h1>}
        <Popup text="Hello!" type="success" />
        <App />
      </>
    );
  }
  
  export default Root;