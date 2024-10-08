import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get, set} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useChatAvatar from "../../hooks/useChatAvatar";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import styled from "styled-components"
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";

    const MessageInput = styled.div`
        display: flex;
        position: fixed;
        width: 100%;
        bottom: 86px;
        padding: 5px;
        left: 0px;
        background-color: white;
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
            background: transparent;
        }
    `

const MessagesBox = styled.div`
    padding-bottom: 100px;
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
            if(!Boolean(result.messanges)){
                result.messanges = []
            }
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
            }
            const updatedMessages = [...query.data.messanges, newMessage]
            set(ref(db, `/chats/${chatId}/messanges/`), {
                ...updatedMessages
            })
            setNewMessageText('')
        }
    }
    useEffect(() => {
        if(query.data){
            getUserAvatar(query.data.senderId).then((res) => setSenderAvatar(res))
            getUserAvatar(query.data.receiverId).then((res) => setReceiverAvatar(res))     
        } 
    },[query.data])
    return (
        <>
            {query.isFetching ? <Loader></Loader> :
            <MessagesBox>
            {query.data?.messanges.map((message : IMessage) => <Message key={message.id}
                id={message.id}
                text={message.text}
                timestamp={message.timestamp}
                userId={message.userId}
                currentUserId={userId}
                senderAvatar={senderAvatar}
                receiverAvatar={receiverAvatar}
            />)}
            </MessagesBox> }
            <MessageInput>
                <textarea rows={5} value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)}></textarea>
                <CenteredButtonBox>
                    <button onClick={() => sendNewMessage()}><FontAwesomeIcon icon={faPencil} /></button>
                </CenteredButtonBox>
            </MessageInput>
        </>
    )
}

export default Chat