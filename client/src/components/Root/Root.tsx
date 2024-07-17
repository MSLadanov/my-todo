import { useEffect } from "react";
import App from "../../App";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      <>
        {userName ? <h1>Welcome, {userName}</h1> : <h1>Welcome, guest!</h1>}
        <App />
      </>
    );
  }
  
  export default Root;