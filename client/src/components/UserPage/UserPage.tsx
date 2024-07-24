import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref } from 'firebase/storage';
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
  const dispatch = useDispatch()
  return (
    <div>
      <h1>UserPage</h1>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}

export default UserPage;