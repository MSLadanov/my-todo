import { getDatabase, ref, child, get} from "firebase/database";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import useChatAvatar from '../../hooks/useChatAvatar'

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
  const { getUserAvatar } = useChatAvatar()
  const query = useQuery({ queryKey: ['chats'], queryFn: getChatList })
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getChatsById(chatsIds: string[]): Promise<any[]> {
      return Promise.all(
        chatsIds.map(async (chatId: string) => {
          const chatData = await get(child(dbRef, `chats/${chatId}`));
          let senderAvatar
          if( userId === chatData.val().senderId ){
            senderAvatar = await getUserAvatar(chatData.val().receiverId)
          } else {
            senderAvatar = await getUserAvatar(chatData.val().senderId)
          }
          console.log(senderAvatar)
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
        <ChatList>{query.data?.map((chat : IChat) => <ChatListItem key={chat.id}><Link to={`${path}/${chat.id}`} key={chat.id}>
          <img src={chat.senderAvatar} alt="" />
          {userId === chat.receiverId ? chat.senderName : chat.receiverName}
        </Link>
        </ChatListItem>)}
        </ChatList>
    </div>)
}

export default Chats