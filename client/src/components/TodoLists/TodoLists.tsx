import { auth } from '../../firebase'
import { Database } from 'firebase/database';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";

function TodoLists() {
    interface IState {
        displayName: string,
        email: string,
        token: string,
        userId: string | undefined  
      }
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log('fetch')
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    console.log(userId)
    console.log(dbRef)
    return (
      <div>
        <h1>TodoLists</h1>
      </div>
    );
  }
  
  export default TodoLists;