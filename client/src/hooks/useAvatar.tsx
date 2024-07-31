import { ref, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../firebase';

function useAvatar(userId : string | undefined){
    const listRef = ref(storage, `userAvatars/${userId}`);
    async function getCurrentAvatarURL() {
        try {
        const res = await listAll(listRef);
        const promises = res.items
        if(promises.length){
            return await getDownloadURL(ref(storage, promises[0].fullPath));
        } else {
            return await getDownloadURL(ref(storage, 'userAvatars/no_avatar.jpg'));
        }
        } catch (error) {
        console.log(error);
        throw error; 
        }
}
    async function removeAvatar(){
        const res = await listAll(listRef);
        res.items.map((itemRef) => {
        const pathReference = ref(storage, itemRef.fullPath);
        deleteObject(pathReference).then(() => {
        // File deleted successfully
        }).catch((error) => {
        // Uh-oh, an error occurred!
            console.log(error)
        });
        })
    }
    return {getCurrentAvatarURL, removeAvatar}
}
  export default useAvatar