import { useQuery } from '@tanstack/react-query';
import { getDatabase, ref, child, get } from "firebase/database";
import useChatAvatar from '../../hooks/useChatAvatar';
import { useLocation } from 'react-router-dom';

function Contact (){
    const location = useLocation()
    const { getUserAvatar } = useChatAvatar()
    const userPageId = location.pathname.split('/').at(-1)
    const dbRef = ref(getDatabase());
    async function getContact() {
        return await get(child(dbRef, `users/${userPageId}`)).then(async (snapshot) => {
                if (snapshot.exists()) {
                  let res = {...snapshot.val(), avatarURL : await getUserAvatar(snapshot.val().id) }
                  return res
                } else {
                  return [];
                }
              }).catch((error) => {
                console.error(error);
              });
      }
    const query = useQuery({ queryKey: ['contact'], queryFn: getContact })
    return (
    <div>
        <div>
            <img src={query.data?.avatarURL} alt="" />
        </div>
        <div>{query.data && query.data?.name + " " + query.data?.surname}</div>
        <div>{query.data?.dateOfBirth}</div>
        <div>{query.data?.about}</div>
    </div>
    )
}

export default Contact