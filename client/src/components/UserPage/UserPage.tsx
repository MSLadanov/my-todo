import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, getDownloadURL, deleteObject, uploadBytes, listAll } from 'firebase/storage';
import { storage } from '../../firebase';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';

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
  const listRef = ref(storage, `userAvatars/${userId}`);
  const query = useQuery({ queryKey: ['avatarURL'], queryFn: getCurrentAvatarURL })
  async function getCurrentAvatarURL() {
    try {
      const res = await listAll(listRef);
      const promises = res.items.map(async (itemRef) => {
        const pathReference = ref(storage, itemRef.fullPath);
        try {
          const url = await getDownloadURL(pathReference);
          console.log(url);
          return url;
        } catch (error) {
          console.log(error);
          return getDownloadURL(ref(storage, 'userAvatars/no_avatar.jpg'));
        }
      });
      console.log((promises[0]))
      return promises[0]
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
  const pathReference = ref(storage, `userAvatars/${userId}/avatar.jpg`);
  const [avatar, setAvatar] = useState('')
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const dispatch = useDispatch()
  function removeAvatar(){
    deleteObject(pathReference).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
  function handleUpdateAvatar (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const preparedFile = new File([e.target.files[0]], 'avatar.png', {type: e.target.files[0].type});
    setNewAvatar(preparedFile)
  }
  function updateAvatar(){
    if (newAvatar !== null){
      removeAvatar()
      uploadBytes(pathReference, newAvatar).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  }
  return (
    <div>
      <h1>UserPage</h1>
      <div>
        <Avatar src={query.data} alt='' />
      </div>
      <div>
      <input type="file" onChange={(e) => handleUpdateAvatar(e)} />
        <button onClick={updateAvatar}>Edit photo</button>
        <button onClick={removeAvatar}>Delete photo</button>
      </div>
      <div>
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </div>
    </div>
  );
}

export default UserPage;