import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

function UserPage() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  const userId  = useSelector((state : IState) => state.userId)
  const pathReference = ref(storage, `userAvatars/${userId}/avatar.jpg`);
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
  function handleUpdateAvatar (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const preparedFile = new File([e.target.files[0]], 'avatar.png', {type: e.target.files[0].type});
    setNewAvatar(preparedFile)
    // removeAvatar()
    // uploadBytes(pathReference, preparedFile).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
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
        <img src={avatar} alt='' />
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