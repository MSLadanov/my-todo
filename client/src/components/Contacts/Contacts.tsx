import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDatabase, ref, child, get } from "firebase/database";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useChatAvatar from '../../hooks/useChatAvatar';
import useChat from '../../hooks/useChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const ContactList = styled.ul`
  padding:0px;
  margin: 0px;
  `

const ContactListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  & img{
    border-radius: 50%;
    height: 50px;
  }
`
const MessageButton = styled.button`
  display: flex;
  border: none;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  padding: 10px;
`

function Contacts() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  interface IContact {
    id: string,
    name: string,
    surname: string,
    dateOfBirth: string, 
    about: string,
    friends: [],
  }
  const navigate = useNavigate();
  const { getUserAvatar } = useChatAvatar()
  const userId  = useSelector((state : IState) => state.userId)
  const userName = useSelector((state : IState) => state.displayName)
  const { createChat, getChatList } = useChat(userId)
  let location = useLocation();
  let path = ''
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1)
    } else {
      path = location.pathname
  }
  const dbRef = ref(getDatabase());
  async function getContacts() {
    return await get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
              let res =  Object.values(snapshot.val()).filter((user : any) => user.id !== userId)
              return Promise.all(res.map(async (user : any) => ({...user, avatarURL : await getUserAvatar(user.id)})))
            } else {
              return [];
            }
          }).catch((error) => {
            console.error(error);
          });
  }
  async function checkExistChat(id: string, name: string) {
    const chats = await getChatList()
    const existingChat = chats?.find((chat) => chat.receiverId === id || chat.senderId === id);
    if (existingChat) {
      navigate(`/chats/${existingChat.id}`);
    } else {
      await createChat(userId, id );
    }
  }
  const query = useQuery({ queryKey: ['contacts'], queryFn: getContacts })
  return (
    <div>
      <ContactList>{query.data?.map((contact : any) => 
        <ContactListItem key={contact.id}>
          <Link to={`${path}/${contact.id}`} key={contact.id}>
            <div><img src={contact.avatarURL} alt="" /></div> 
          </Link>
          <div>{contact.name + " " + contact.surname}</div>
          <MessageButton onClick={() => checkExistChat(contact.id, contact.name)}><FontAwesomeIcon icon={faMessage} size='xl' /></MessageButton>
        </ContactListItem>)}
      </ContactList>
    </div>
  );
}

export default Contacts;