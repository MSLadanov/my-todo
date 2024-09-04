import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '../..';
import useAvatar from '../../hooks/useAvatar';
import EditableRow from '../EditableRow/EditableRow';
import Loader from '../Loader/Loader';

const Avatar = styled.img`
    width: 150px;        
    height: 150px;
    border-radius: 50%;
    border: 3px solid #B0E0E6;
    background-color: #F0F8FF;
    margin-bottom: 20px;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
`;

const UserSettings = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const PhotoSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D9F2E6;
  padding: 10px;
  border-radius: 10px;
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #B0E0E6;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
`;

const PhotoSettingsButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  button {
    background-color: #98FB98;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 48%;

    &:hover {
      background-color: #B0E0E6;
    }
  }
`;

const UserInfoSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: #F0F8FF;
  padding: 15px;
  border-radius: 10px;
`;

const LogOutBtn = styled.div`
  margin-top: 20px;

  button {
    background-color: #B0E0E6;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #98FB98;
    }
  }
`;

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }

  const userId = useSelector((state: IState) => state.userId);
  const { getCurrentAvatarURL, removeAvatar, getUserData } = useAvatar(userId);
  const query = useQuery({ queryKey: ['avatarURL'], queryFn: getCurrentAvatarURL });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const dispatch = useDispatch();
  const [toggleEditForm, setToggleEditForm] = useState(false);

  const remove = useMutation({
    mutationFn: removeAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatarURL'] });
    },
  });

  const update = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatarURL'] });
    },
  });

  function handleUpdateAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const preparedFile = new File([e.target.files[0]], `${uuidv4()}`, { type: e.target.files[0].type });
    setNewAvatar(preparedFile);
  }

  const userData = useQuery({ queryKey: ['userData'], queryFn: getUserData, initialData: {} });

  async function updateAvatar() {
    if (newAvatar !== null) {
      console.log('updating avatar...');
      removeAvatar().then(() => {
        const pathReference = ref(storage, `userAvatars/${userId}/${uuidv4()}`);
        uploadBytes(pathReference, newAvatar).then((snapshot) => {
          console.log('avatar updated!');
          console.log('Uploaded a blob or file!');
          query.refetch();
        });
      })
      .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {query.isFetching && userData.isFetching ? <Loader /> :
      <UserProfile>
        <Avatar src={query.data} alt='' />
        <UserSettings>
          <PhotoSettings>
            <Input type="file" onChange={(e) => handleUpdateAvatar(e)} />
            <PhotoSettingsButtons>
              <button onClick={() => { 
                update.mutate();
                getCurrentAvatarURL();
              }}>Edit photo</button>
              <button onClick={() => { 
                remove.mutate();
                getCurrentAvatarURL();
              }}>Delete photo</button>
            </PhotoSettingsButtons>
          </PhotoSettings>
          {userData?.data && userId &&
            <UserInfoSettings>
              <EditableRow field='name' value={userData.data?.name} id={userId} />
              <EditableRow field='surname' value={userData.data?.surname} id={userId} />
              <EditableRow field='dateOfBirth' value={userData.data?.dateOfBirth} id={userId} />
              <EditableRow field='about' value={userData.data?.about} id={userId} />
            </UserInfoSettings>
          }
        </UserSettings>
        <LogOutBtn>
          <button onClick={() => dispatch(logout())}>Log Out</button>
        </LogOutBtn>
      </UserProfile>}
    </>
  );
}

export default UserPage;
