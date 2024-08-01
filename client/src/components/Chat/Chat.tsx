import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useChatAvatar from "../../hooks/useChatAvatar";
import { useSelector } from "react-redux";
import useAvatar from "../../hooks/useAvatar";
import Message from "../Message/Message";

function Chat(){
    interface IState {
        displayName: string,
        email: string,
        token: string,
        userId: string | undefined  
    }
    interface IMessage {
        id: string, 
        text: string,
        timestamp: string,
        userId: string,
        userName: string,
    }
    const userId = useSelector((state : IState) => state.userId)
    const { getCurrentAvatarURL } = useAvatar(userId)
    const { getUserAvatar, getNoAvatarImage } = useChatAvatar()
    const [ receiverAvatar, setReceiverAvatar ] = useState<string | undefined>('')
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
            getUserAvatar(query.data.receiverId).then((res) => setReceiverAvatar(res))     
        } else {
            getNoAvatarImage().then((res) => setSenderAvatar(res))
            getNoAvatarImage().then((res) => setReceiverAvatar(res))
        }
    },[query.data])
    console.log(query.data)
    return (
        <div>
            <h1>Chat</h1>
            <h2>{query.data?.senderName}</h2>
            {query.data?.messanges.map((message : IMessage) => <Message key={message.id}
                id={message.id}
                text={message.text}
                timestamp={message.timestamp}
                userId={message.userId}
                userName={message.userName}
                userAvatar={userId === message.userId ? receiverAvatar : senderAvatar}
                currentUserId={userId}
            />)}
        </div>
    )
}

export default Chat