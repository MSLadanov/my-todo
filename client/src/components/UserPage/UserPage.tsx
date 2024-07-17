import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

function UserPage() {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(logout())}>Log Out</button>
      <h1>UserPage</h1>
    </div>
  );
}

export default UserPage;