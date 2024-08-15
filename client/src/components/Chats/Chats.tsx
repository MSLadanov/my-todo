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
    text-decoration: none;
    margin: 0px;
  }
`

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
    userName: string
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
    return JSON.stringify(chat.messanges.at(-1).userName) + ':' + JSON.stringify(chat.messanges.at(-1).text)
  }
  console.log(query.data)
  return (
    <ChatsBox>
        <h1>Chats</h1>
        <ChatList>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link style={{display:'flex'}} to={`${path}/${chat.id}`} key={chat.id}>
          <ChatAvatar>
            <img src={chat.senderAvatar} alt="" />
          </ChatAvatar>
          <ChatInfo>
            <p>{userId === chat.receiverId ? chat.senderName : chat.receiverName}</p>
            <p>{showLastMessage(chat)}</p>
          </ChatInfo>
        </Link>
        </ChatListItem>)}
        </ChatList>
    </ChatsBox>)
}

export default Chats