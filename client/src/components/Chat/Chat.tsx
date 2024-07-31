import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ref as refStorage, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase";

function Chat(){
    const [ receiverAvatar, setReceiverAvatar ] = useState('')
    const query = useQuery({ queryKey: ['chatData'], queryFn: getChatData })
    let location = useLocation();
    const dbRef = ref(getDatabase());
    const chatId = location.pathname.split('/').at(-1)
    async function getChatData() {
        try {
            const chatData = await get(child(dbRef, `chats/${chatId}`))
            return chatData.val()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDownloadURL(refStorage(storage, 'userAvatars/no_avatar.jpg'))
        .then((res) => setReceiverAvatar(res))
        .catch((err) => console.log(err))
    },[])
    console.log(query.data)
    console.log(receiverAvatar)
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat