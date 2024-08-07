import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDatabase, ref, child, get } from "firebase/database";

function Contacts() {
  const dbRef = ref(getDatabase());
    async function getContacts() {
      return await get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
              return snapshot.val();
            } else {
              return [];
            }
          }).catch((error) => {
            console.error(error);
          });
    }
  const query = useQuery({ queryKey: ['contacts'], queryFn: getContacts })
  console.log(query.data)
  return (
    <div>
      <h1>Contacts</h1>
    </div>
  );
}

export default Contacts;