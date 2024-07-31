import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get} from "firebase/database";
import { useQuery } from "@tanstack/react-query";

function Chat(){
    // const query = useQuery({ queryKey: ['chats'], queryFn: getChatData })
    let location = useLocation();
    const dbRef = ref(getDatabase());
    const chatId = location.pathname.split('/').at(-1)
    async function getChatData(id: string) {
        try {
            return (await get(child(dbRef, `chats/${id}`))).val()
        } catch (error) {
            console.log(error)
        }
    }
    if (chatId){
        console.log(getChatData(chatId))
    }
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat