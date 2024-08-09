import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDatabase, ref, child, get } from "firebase/database";
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useChatAvatar from '../../hooks/useChatAvatar';
import useChat from '../../hooks/useChat';

const ContactList = styled.ul`
  padding:0px;
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
  const { getUserAvatar } = useChatAvatar()
  const userId  = useSelector((state : IState) => state.userId)
  const { getUserChats, getChatList } = useChat(userId)
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
  async function checkExistChat(id : string) {
    const chats = await getChatList()
    const isChatExist = Boolean(chats?.find((chat) => chat.receiverId === id || chat.senderId === id))
    console.log(isChatExist)
  }
  const query = useQuery({ queryKey: ['contacts'], queryFn: getContacts })
  return (
    <div>
      <h1>Contacts</h1>
      <ContactList>{query.data?.map((contact : any) => 
        <ContactListItem key={contact.id}>
          <Link to={`${path}/${contact.id}`} key={contact.id}>
            <div><img src={contact.avatarURL} alt="" /></div> 
          </Link>
          <div>{contact.name + " " + contact.surname}</div>
          <button onClick={() => checkExistChat(contact.id)}>&#9993;</button>
        </ContactListItem>)}
      </ContactList>
    </div>
  );
}

export default Contacts;