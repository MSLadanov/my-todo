import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  const dispatch = useDispatch()
  const userId  = useSelector((state : IState) => state.userId)
  return (
    <div>
      <h1>UserPage</h1>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}

export default UserPage;