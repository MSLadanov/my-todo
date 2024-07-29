import { useLocation } from "react-router-dom";

function Chat(){
    let location = useLocation();
    return (
        <div>
            <h1>Chat {location.pathname}</h1>
        </div>
    )
}

export default Chat