import { auth } from '../../firebase'
import { Database } from 'firebase/database';
import { useState } from 'react';
import { useQuery, useMutation, } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";

function TodoLists() {
    interface IState {
        displayName: string,
        email: string,
        token: string,
        userId: string | undefined  
      }
    interface ITodo {
      id: string,
      name: string,
    }
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getTodoLists(){
      return get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().todoLists)
          return snapshot.val().todoLists;
        } else {
          return [];
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodoLists })
    getTodoLists()
    return (
      <div>
        <h1>TodoLists</h1>
        <ul>{query.data?.map((todo : ITodo) => <li key={todo.id}>{todo.name}</li>)}</ul>
      </div>
    );
  }
  
  export default TodoLists;