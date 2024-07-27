import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid'
import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '../..';
import useAvatar from '../../hooks/useAvatar';

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  const Avatar = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
  `
  const userId  = useSelector((state : IState) => state.userId)
  const { getCurrentAvatarURL, removeAvatar } = useAvatar(userId)
  const query = useQuery({ queryKey: ['avatarURL'], queryFn: getCurrentAvatarURL })
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const dispatch = useDispatch()
  const remove = useMutation({
    mutationFn: removeAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatarURL'] })
    },
  });
  const update = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatarURL'] })
    },
  });
  function handleUpdateAvatar (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const preparedFile = new File([e.target.files[0]], `${uuidv4()}`, {type: e.target.files[0].type});
    setNewAvatar(preparedFile)
  }
  async function updateAvatar(){
    if (newAvatar !== null){
      removeAvatar()
      const pathReference = ref(storage, `userAvatars/${userId}/${uuidv4()}`);
        uploadBytes(pathReference, newAvatar).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getCurrentAvatarURL()
      });
    }
  }
  return (
    <div>
      <h1>UserPage</h1>
      <Avatar src={query.data} alt='' />
      <div>
      <input type="file" onChange={(e) => handleUpdateAvatar(e)} />
        <button onClick={() => { 
          update.mutate() 
          getCurrentAvatarURL()}}>Edit photo</button>
        <button onClick={() => { 
          remove.mutate()
          getCurrentAvatarURL()
        }}>Delete photo</button>
      </div>
      <div>
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </div>
    </div>
  );
}

export default UserPage;