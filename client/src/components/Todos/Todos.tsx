import { useEffect, useState } from 'react';
import { db, auth} from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function Todos() {
  let { todoListId } = useParams();
  console.log(todoListId)
  return (
    <div>
      <h1>Todos</h1>
    </div>
  );
}

export default Todos;