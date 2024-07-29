import { getDatabase, ref, child, get} from "firebase/database";

function Chats (){
    const dbRef = ref(getDatabase());
    async function getChatList(){
        return get(child(dbRef, `chats/a99ff62a-fcf4-454d-8300-830f5c1d3d69`)).then((snapshot) => {
          if (snapshot.exists()) {
            const chats = snapshot.val()
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