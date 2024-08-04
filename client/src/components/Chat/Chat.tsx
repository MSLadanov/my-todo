import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get, set} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useChatAvatar from "../../hooks/useChatAvatar";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import styled from "styled-components"
import {v4 as uuidv4} from 'uuid'

const MessageInput = styled.div`
        display: flex;
        & textarea{
            resize: none;
            width: 80%
        }
    `
    const CenteredButtonBox = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        & button{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 28px;
        }
    `

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
    const [newMessageText, setNewMessageText] = useState<string>('')
    const userId = useSelector((state : IState) => state.userId)
    const userName = useSelector((state : IState) => state.displayName)
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
    function sendNewMessage(){
        if(userId && userName){
            const db = getDatabase();
            const newMessage : IMessage = {
                id: uuidv4(),
                text: newMessageText,
                timestamp: String(Date.now()),
                userId,
                userName,
            }
            const updatedMessages = [...query.data.messanges, newMessage]
            set(ref(db, `/chats/${chatId}/messanges/`), {
                ...updatedMessages
            })
            setNewMessageText('')
            query.refetch()
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
    return (
        <div>
            <h1>Chat</h1>
            <h2>{userId === query.data?.receiverId ? query.data?.senderName : query.data?.receiverName}</h2>
            {query.data?.messanges.map((message : IMessage) => <Message key={message.id}
                id={message.id}
                text={message.text}
                timestamp={message.timestamp}
                userId={message.userId}
                userName={message.userName}
                userAvatar={userId === message.userId ? senderAvatar : receiverAvatar}
                currentUserId={userId}
                senderName={query.data.senderName}
                receiverName={query.data.receiverName}
                senderAvatar={senderAvatar}
                receiverAvatar={receiverAvatar}
            />)}
            <MessageInput>
                <textarea rows={5} value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)}></textarea>
                <CenteredButtonBox>
                    <button onClick={() => sendNewMessage()}>&#128393;</button>
                </CenteredButtonBox>
            </MessageInput>
        </div>
    )
}

export default Chat