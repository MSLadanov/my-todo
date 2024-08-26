import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import no_avatar from '../assets/no_avatar.jpg'

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
                    return no_avatar
                }
                } catch (error) {
                    console.log(error);
                    throw error; 
                }
    }
    function getNoAvatarImage(){
        return no_avatar
    }
    return {getUserAvatar, getNoAvatarImage}
}
export default useChatAvatar