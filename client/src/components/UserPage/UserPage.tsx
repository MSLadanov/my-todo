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
import ReadableRow from '../ReadableRow/ReadableRow';

const Avatar = styled.img`
    width: 50%;        
    height: auto;
    border-radius: 50%;
`
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`

const UserSettings = styled.div`
  & div{
    margin: 15px 0px;
  }
`

const PhotoSettings = styled.div`
  display: flex;
  flex-direction: column;
`
const PhotoSettingsButtons = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserInfoSettings = styled.div`
`

const LogOutBtn = styled.div`
`

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  const userId  = useSelector((state : IState) => state.userId)
  const { getCurrentAvatarURL, removeAvatar, getUserData } = useAvatar(userId)
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
  const userData = useQuery({ queryKey: ['userData'], queryFn: getUserData , initialData: {}})
  async function updateAvatar(){
    if (newAvatar !== null){
      console.log('updating avatar...')
      removeAvatar().then(() => {
        const pathReference = ref(storage, `userAvatars/${userId}/${uuidv4()}`);
        uploadBytes(pathReference, newAvatar).then((snapshot) => {
        console.log('avatar updated!')
        console.log('Uploaded a blob or file!');
        query.refetch()
      });
      })
      .catch((err) => console.log(err))
    }
  }
  return (
    <UserProfile>
      <Avatar src={query.data} alt='' />
      <UserSettings>
        <PhotoSettings>
          <input type="file" onChange={(e) => handleUpdateAvatar(e)} />
          <PhotoSettingsButtons>
            <button onClick={() => { 
            update.mutate() 
            getCurrentAvatarURL()}}>Edit photo</button>
            <button onClick={() => { 
            remove.mutate()
            getCurrentAvatarURL()
            }}>Delete photo</button>
          </PhotoSettingsButtons>
        </PhotoSettings>
          {userData?.data &&
            <UserInfoSettings>
              <ReadableRow field='name' value={userData.data?.name}></ReadableRow>
              <ReadableRow field='surname' value={userData.data?.surname}></ReadableRow>
              <ReadableRow field='dateOfBirth' value={userData.data?.dateOfBirth}></ReadableRow>
              <ReadableRow field='about' value={userData.data?.about}></ReadableRow>
            </ UserInfoSettings>
          }
      </UserSettings>
      <LogOutBtn>
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </LogOutBtn>
    </UserProfile>
  );
}

export default UserPage;