import { getDatabase, ref, child, get} from "firebase/database";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';


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
  const query = useQuery({ queryKey: ['chats'], queryFn: getChatList })
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getChatList(){
        return get(child(dbRef, `chatLists/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const chatsIds = snapshot.val()
            return chatsIds.map((chatId : string) => {
              return get(child(dbRef, `chats/${chatId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  return snapshot.val();
                } else {
                  return [];
                }
              }
            )})
        }}).catch((error) => {
          console.error(error);
        });
    }
    console.log(query.data)
    return (
    <div>
        <h1>Chats</h1>
        <ul>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link to={`${path}/${chat.id}`} key={chat.id}>{chat.senderName}</Link></ChatListItem>)}</ul>
    </div>)
}

export default Chats