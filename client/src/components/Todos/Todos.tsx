import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Todos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'your-collection')).then((data) => console.log(data));
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Todos</h1>
    </div>
  );
}

export default Todos;