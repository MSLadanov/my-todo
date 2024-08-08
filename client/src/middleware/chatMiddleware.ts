import { getDatabase, ref, child, get} from "firebase/database";

function chatMiddleWare(userId : string | undefined){
    const dbRef = ref(getDatabase());
    async function getUserChats() {
        const chatData = await get(child(dbRef, `chatLists/${userId}`));
        console.log(chatData.val())
    }
    return {getUserChats}
}

export default chatMiddleWare