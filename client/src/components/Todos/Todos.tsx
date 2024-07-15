import { useEffect, useState } from 'react';
import { db, auth} from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Todos() {

  return (
    <div>
      <h1>Todos</h1>
    </div>
  );
}

export default Todos;