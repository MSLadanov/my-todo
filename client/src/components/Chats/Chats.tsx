import { useState } from "react";
import { getDatabase, ref, child, get} from "firebase/database";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import useChatAvatar from '../../hooks/useChatAvatar'


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
    senderAvatar: string,
    messanges: []
  }
  const ChatListItem = styled.li`

  `
  let location = useLocation();
    let path = ''
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1)
    } else {
      path = location.pathname
    }
  const { getUserAvatar } = useChatAvatar()
  const query = useQuery({ queryKey: ['chats'], queryFn: getChatList })
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getChatsById(chatsIds: string[]): Promise<any[]> {
      return Promise.all(
        chatsIds.map(async (chatId: string) => {
          const chatData = await get(child(dbRef, `chats/${chatId}`));
          const senderAvatar = await getUserAvatar(chatData.val().senderId)
          return {...chatData.val(), senderAvatar};
        })
      );
    }
    async function getChatList() {
      try {
        const chatsIdsSnapshot = await get(child(dbRef, `chatLists/${userId}`));
        const chatsIds = chatsIdsSnapshot.val();
        return await getChatsById(chatsIds);
      } catch (error) {
        console.log(error);
      }
    }
    return (
    <div>
        <h1>Chats</h1>
        <ul>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link to={`${path}/${chat.id}`} key={chat.id}>
          <img src={chat.senderAvatar} alt="" />
          {chat.senderName}
        </Link>
        </ChatListItem>)}
        </ul>
    </div>)
}

export default Chats