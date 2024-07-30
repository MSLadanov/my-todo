import { getDatabase, ref, child, get} from "firebase/database";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Chat from "../Chat/Chat";

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
  const query = useQuery({ queryKey: ['chats'], queryFn: getChatList })
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getChatList(){
        return get(child(dbRef, `chatLists/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const chatsIds = snapshot.val()
            return chatsIds.map((chatId : string) => {
              return get(child(dbRef, `chats/${chatId}`)).then((snapshot) => snapshot.val())
                    .catch((err) => console.log(err))})
        }}).catch((error) => {
          console.error(error);
        });
    }
    return (
    <div>
        <h1>Chats</h1>
        {query.data?.map((chat : IChat) => <Chat key={chat.id}></Chat>)}
    </div>)
}

export default Chats