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
  list-style-type: none;
`

function Chats (){
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  interface IChat {
    id: string,
    senderId: string,
    receiverId: string, 
    senderName: string,
    receiverName: string,
    senderAvatar: string,
    messanges: []
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
  return (
    <div>
        <h1>Chats</h1>
        <ChatList>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link to={`${path}/${chat.id}`} key={chat.id}>
          <img src={chat.senderAvatar} alt="" />
          {userId === chat.receiverId ? chat.senderName : chat.receiverName}
        </Link>
        </ChatListItem>)}
        </ChatList>
    </div>)
}

export default Chats