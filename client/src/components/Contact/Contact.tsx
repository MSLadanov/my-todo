import { useQuery } from '@tanstack/react-query';
import { getDatabase, ref, child, get } from "firebase/database";
import useChatAvatar from '../../hooks/useChatAvatar';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const ContactPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ContactAvatarBox = styled.div`
  display: flex;
  justify-content: center;
  & img{
    width: 100%;        
    height: auto;
    border-radius: 50%;
  }
`

const ContactInfoBox = styled.div`
  margin: 15px 0px;
`

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
    <>
      {query.isFetching ? <Loader></Loader> :
      <ContactPage>
          <ContactAvatarBox>
              <img src={query.data?.avatarURL} alt="" />
          </ContactAvatarBox>
          <ContactInfoBox>
            {query.data && query.data?.name + " " + query.data?.surname}
          </ContactInfoBox>
          <ContactInfoBox>
            {query.data?.dateOfBirth}
          </ContactInfoBox>
          <ContactInfoBox>
            {query.data?.about}
          </ContactInfoBox>
      </ContactPage>}
    </>
    )
}

export default Contact