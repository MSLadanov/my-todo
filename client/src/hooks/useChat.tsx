import { getDatabase, ref, child, get, set} from "firebase/database";
import useChatAvatar from "./useChatAvatar";
import {v4 as uuidv4} from 'uuid'

function useChat(userId : string | undefined){
    const dbRef = ref(getDatabase());
    const { getUserAvatar } = useChatAvatar()
    async function getUserChats() {
        const chatData = await get(child(dbRef, `chatLists/${userId}`));
        console.log(chatData.val())
    }
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
            return {...chatData.val(), senderAvatar};
          })
        );
      }
      async function getChatList() {
        try {
          const chatsIdsSnapshot = await get(child(dbRef, `chatLists/${userId}`));
          const chatsIds = chatsIdsSnapshot.val();
          const userChats = await getChatsById(chatsIds);
          return userChats
        } catch (error) {
          console.log(error);
        }
      }
      async function createChat(senderId : string | undefined, receiverId : string, senderName : string, receiverName : string) {
        const newChat = {
          id: uuidv4(),
          senderId,
          receiverId,
          senderName,
          receiverName,
          messanges: []
        }
        const db = getDatabase();
        const senderChatList = await get(child(dbRef, `chatLists/${senderId}`));
        const receiverChatList = await get(child(dbRef, `chatLists/${receiverId}`));
        // set(ref(db, `/chatLists/${userId}/todoLists/${todosId.current}/todos`), {
        //   ...todos
        //  });
        console.log(senderChatList, receiverChatList)
        console.log(newChat)
      }
    return {getUserChats, getChatsById, getChatList, createChat}
}

export default useChat