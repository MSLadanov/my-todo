import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import useChat from "../../hooks/useChat";

const ChatList = styled.ul`
  padding:0px;
`
const ChatListItem = styled.li`
  & img{
    border-radius: 50%;
    height: 50px;
  }
  display: flex;
  list-style-type: none;
  width:100vw;
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
    color: black;
    margin: 0px;
  }
`
const ChatTime = styled.div`
  margin-right: 15px;
`
const ChatContent = styled.div`
  display: flex;
  margin-left: 15px;
`

const LinkStyle = {
  display:'flex', 
  textDecoration: 'none', 
  width: '100vw', 
  justifyContent:'space-between', 
  margin:'15px 0px'
}

function Chats (){
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
    userName: string,
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
  function showLastMessage(chat : IChat ){
    const lastMessage : IMessage = chat.messanges.at(-1)
    const lastMessageData = {
      name: lastMessage.userId === userId ? 'You' : lastMessage.userName,
      text: lastMessage.text
    }
    return lastMessageData.name + ' : ' + lastMessageData.text
  }
  return (
    <ChatsBox>
        <h1>Chats</h1>
        <ChatList>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link style={LinkStyle} to={`${path}/${chat.id}`} key={chat.id}>
          <ChatContent>
            <ChatAvatar>
              <img src={chat.senderAvatar} alt="" />
            </ChatAvatar>
          <ChatInfo>
            <p>{userId === chat.receiverId ? chat.senderName : chat.receiverName}</p>
            <p>{showLastMessage(chat)}</p>
          </ChatInfo>
          </ChatContent>
          <ChatTime>15:00</ChatTime>
        </Link>
        </ChatListItem>)}
        </ChatList>
    </ChatsBox>)
}

export default Chats