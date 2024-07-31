import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useChatAvatar from "../../hooks/useChatAvatar";

function Chat(){
    const { getUserAvatar, getNoAvatarImage } = useChatAvatar()
    const [ senderAvatar, setSenderAvatar ] = useState<string | undefined>('')
    const query = useQuery({ queryKey: ['chatData'], queryFn: getChatData })
    let location = useLocation();
    const dbRef = ref(getDatabase());
    const chatId = location.pathname.split('/').at(-1)
    async function getChatData() {
        try {
            const chatData = await get(child(dbRef, `chats/${chatId}`))
            const result = chatData.val()
            return result
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(query.data){
            getUserAvatar(query.data.senderId).then((res) => setSenderAvatar(res))    
        } else {
            getNoAvatarImage().then((res) => setSenderAvatar(res))
        }
    },[query.data])
    console.log(query.data)
    return (
        <div>
            <h1>Chat</h1>
            <img src={senderAvatar} alt="" />
            <h2>{query.data?.senderName}</h2>
        </div>
    )
}

export default Chat