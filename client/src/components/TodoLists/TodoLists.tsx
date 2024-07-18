import { auth } from '../../firebase'
import { getDatabase, ref, child, get } from "firebase/database";

function TodoLists() {
    const userId : string | undefined = auth.currentUser?.uid
    const dbRef = ref(getDatabase());
    get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
    console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
    
    console.log(userId)
    return (
      <div>
        <h1>TodoLists</h1>
      </div>
    );
  }
  
  export default TodoLists;