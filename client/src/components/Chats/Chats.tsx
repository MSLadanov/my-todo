import { getDatabase, ref, child, get} from "firebase/database";
import { useSelector } from "react-redux";

function Chats (){
    const userId  = useSelector((state : any) => state.userId)
    const dbRef = ref(getDatabase());
    async function getChatList(){
        return get(child(dbRef, `chatLists/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const chatsIds = snapshot.val()
            const chats = chatsIds.map((chatId : any) => {
              return get(child(dbRef, `chats/${chatId}`)).then((snapshot) => snapshot.val())
                    .catch((err) => console.log(err))
            })
            console.log(chats)
        }}).catch((error) => {
          console.error(error);
        });
    }
    getChatList()
    return (
    <div>
        <h1>Chats</h1>
    </div>)
}

export default Chats