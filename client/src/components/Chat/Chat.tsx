import { useLocation } from "react-router-dom";
import { getDatabase, ref, child, get} from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ref as refStorage, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from "../../firebase";
import useAvatar from "../../hooks/useAvatar";

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
        async function getReceiverAvatar () {
            const listRef = refStorage(storage, `userAvatars/${query.data.senderId}`);
            try {
                const res = await listAll(listRef);
                const promises = res.items
                if(promises.length){
                    getDownloadURL(refStorage(storage, promises[0].fullPath))
                    .then((res) => setReceiverAvatar(res))
                    .catch((err) => console.log(err))
                } 
                } catch (error) {
                console.log(error);
                throw error; 
                }
        }
        if(query.data){
            getReceiverAvatar()
        } else {
            console.log('using no-avatar image')
            getDownloadURL(refStorage(storage, 'userAvatars/no_avatar.jpg'))
            .then((res) => setReceiverAvatar(res))
            .catch((err) => console.log(err))
        }
    },[query.data])
    // console.log(query.data)
    // console.log(receiverAvatar)
    return (
        <div>
            <h1>Chat</h1>
            <img src={receiverAvatar} alt="" />
            {/* <h2>{query.data.senderName}</h2> */}
        </div>
    )
}

export default Chat