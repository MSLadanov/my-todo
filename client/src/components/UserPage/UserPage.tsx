import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
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
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  getDownloadURL(pathReference)
  .then((url) => {
    setAvatar(url)
  })
  .catch((error) => {
    getDownloadURL(ref(storage, `userAvatars/no_avatar.jpg`))
    .then((url) => {
      setAvatar(url)
    })
    console.log(error)
  });
  const dispatch = useDispatch()
  function removeAvatar(){
    deleteObject(pathReference).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
  function updateAvatar (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    console.log(e.target.files[0])
  }
  return (
    <div>
      <h1>UserPage</h1>
      <div>
        <img src={avatar} alt='' />
      </div>
      <div>
      <input type="file" onChange={(e) => updateAvatar(e)} />
        <button>Edit photo</button>
        <button onClick={removeAvatar}>Delete photo</button>
      </div>
      <div>
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </div>
    </div>
  );
}

export default UserPage;