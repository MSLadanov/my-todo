import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

function UserPage() {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>UserPage</h1>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}

export default UserPage;