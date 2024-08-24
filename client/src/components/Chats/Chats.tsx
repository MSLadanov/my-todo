import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import useChat from "../../hooks/useChat";
import getDate from "../../helpers/getDate"
import { getDatabase, ref, child, get } from "firebase/database";
import { useState } from "react";

const ChatList = styled.ul`
  margin: 0px;
  padding:0px;
`
const ChatListItem = styled.li`
  & img{
    border-radius: 50%;
    height: 50px;
  }
  display: flex;
  list-style-type: none;
`

const ChatsBox = styled.div`
`
const ChatAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  & p{
    border-radius: 12px;
    padding: 8px;
    color: black;
    margin: 0px;
  }
`
const ChatTime = styled.div`
`
const ChatContent = styled.div`
  display: flex;
`
const LastMessageContainer = styled.div<{messageUserId : string, userId : string | undefined}>`

`

const LinkStyle = {
  display:'flex', 
  textDecoration: 'none', 
  width: '100vw', 
  justifyContent:'space-between', 
}

interface IState {
  displayName: string,
  email: string,
  token: string,
  userId: string | undefined  
}
interface IMessage{
  id: string,
  timestamp : string
  userId: string,
  text: string,
}
interface IChat {
  id: string,
  senderId: string,
  receiverId: string, 
  senderName: string,
  receiverName: string,
  senderAvatar: string,
  messanges: any[]
}

function Chats (){
  
  let location = useLocation();
  let path = ''
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1)
    } else {
      path = location.pathname
  }
  const userId  = useSelector((state : IState) => state.userId)
  const { getChatList } = useChat(userId)
  const query = useQuery({ queryKey: ['chats'], queryFn: getChatList })
  function getLastMessage(chat : IChat ){
    const lastMessage : IMessage = chat.messanges.at(-1)
    const lastMessageData : IMessage = {
      id: lastMessage.id,
      userId: lastMessage.userId,
      text: lastMessage.text,
      timestamp: lastMessage.timestamp
    }
    return lastMessageData
  }
  return (
    <ChatsBox>
        <ChatList>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link style={LinkStyle} to={`${path}/${chat.id}`} key={chat.id}>
          <ChatContent>
            <ChatAvatar>
              <img src={chat.senderAvatar} alt="" />
            </ChatAvatar>
          <ChatInfo>
            <p style={{fontWeight:'bolder'}}></p>
            <UserFullName senderId={chat.senderId} receiverId={chat.receiverId} userId={userId}/>
            <LastMessageContainer messageUserId={getLastMessage(chat).userId} userId={userId}>
            {/* <div style={{backgroundColor: getLastMessage(chat).userId === userId ? '#D9F2E6' : '#D7E8FF', display: 'flex', alignItems:'center'}}> */}
              <UserName lastMessage={getLastMessage(chat)} userId={userId}/>
              {' : ' + getLastMessage(chat).text}
            </LastMessageContainer>
          </ChatInfo>
          </ChatContent>
          <ChatTime>{getDate((getLastMessage(chat).timestamp))}</ChatTime>
        </Link>
        </ChatListItem>)}
        </ChatList>
    </ChatsBox>)
}

function UserFullName({senderId, receiverId, userId} : any){
  const [ fullName, setFullName ] = useState<null | string>(null)
  const dbRef = ref(getDatabase());
  const tempId = [senderId, receiverId].filter((item) => item !== userId)[0]
  async function getUserFullName (){
    const name =  (await (get(child(dbRef, `users/${tempId}/name`)))).val();
    const surname =  (await (get(child(dbRef, `users/${tempId}/surname`)))).val();
    setFullName(name + ' ' + surname)
  }
  getUserFullName()
  return (
    <p>{fullName}</p>
  )
}

function UserName({lastMessage, userId} : any){
  const query = useQuery({ queryKey: ['name'], queryFn: getUserName })
  let name = null
  const dbRef = ref(getDatabase());
  async function getUserName (){
    const name =  (await (get(child(dbRef, `users/${lastMessage.userId}/name`)))).val();
    return name
  }
  console.log(getUserName())
  if(lastMessage.userId === userId){
    name = 'You'
  } else {
    name = query.data
  }
  return (
    <p>{name}</p>
  )
}

export default Chats