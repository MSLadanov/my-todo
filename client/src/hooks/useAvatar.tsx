import { ref, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { getDatabase, ref as refDB, child, get, set, update, push} from "firebase/database";
import { storage } from '../firebase';

function useAvatar(userId : string | undefined){
    const listRef = ref(storage, `userAvatars/${userId}`);
    const dbRef = refDB(getDatabase());
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
    async function getUserData() {
        try {
            const userData = (await get(child(dbRef, `users/${userId}`))).val()
            console.log(userData)
        } catch (error) {
            console.log(error)
        }
    }
    return {getCurrentAvatarURL, removeAvatar, getUserData}
}
  export default useAvatar