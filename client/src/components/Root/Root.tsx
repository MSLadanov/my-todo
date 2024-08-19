import { useEffect } from "react";
import App from "../../App";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePopup from "../../hooks/usePopup";

// const TopBar = styled.div`
// `

function Root() {
    interface IState {
        displayName: string,
        email: string,
        token: string 
      }
    const userName = useSelector((state : IState) => state.displayName)
    const navigate = useNavigate();
    useEffect(() => {
      if (!userName) {
        navigate("/signin");
      }
    }, [userName]);
    return (
        <App />
    );
  }
  
  export default Root;