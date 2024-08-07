import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';

function useChatAvatar(){
    async function getUserAvatar(id : string){
        const listRef = ref(storage, `userAvatars/${id}`);
            try {
                const res = await listAll(listRef);
                const promises = res.items
                if(promises.length){
                    return await getDownloadURL(ref(storage, promises[0].fullPath))
                } 
                else {
                    return await getDownloadURL(ref(storage, 'userAvatars/no_avatar.jpg'))
                }
                } catch (error) {
                console.log(error);
                throw error; 
                }
    }
    async function getNoAvatarImage(){
        return await getDownloadURL(ref(storage, 'userAvatars/no_avatar.jpg'))
    }
    return {getUserAvatar, getNoAvatarImage}
}
export default useChatAvatar