import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  const userId  = useSelector((state : IState) => state.userId)
  const pathReference = ref(storage, `userAvatars/${userId}.jpg`);
  const [avatar, setAvatar] = useState('')
  getDownloadURL(pathReference)
  .then((url) => {
    setAvatar(url)
  })
  .catch((error) => {
    console.log(error)
  });
  const dispatch = useDispatch()
  return (
    <div>
      <h1>UserPage</h1>
      <div>
        <img src={avatar} />
      </div>
      <div>
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </div>
    </div>
  );
}

export default UserPage;