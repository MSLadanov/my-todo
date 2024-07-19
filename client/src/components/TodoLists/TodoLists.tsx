import { auth } from '../../firebase'
import { Database } from 'firebase/database';
import { useState } from 'react';
import { useQuery, useMutation, } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link, useLocation } from 'react-router-dom';

function TodoLists() {
    interface IState {
        displayName: string,
        email: string,
        token: string,
        userId: string | undefined  
      }
    interface ITodoList {
      id: string,
      name: string,
    }
    let location = useLocation();
    let path = ''
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1)
    } else {
      path = location.pathname
    }
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getTodoLists(){
      return get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val().todoLists;
        } else {
          return [];
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    console.log(path)
    const query = useQuery({ queryKey: ['todolists'], queryFn: getTodoLists })
    return (
      <div>
        <h1>TodoLists</h1>
        <ul>{query.data?.map((todoList : ITodoList) => <Link to={`${path}/${todoList.id}`} key={todoList.id}>{todoList.name}</Link>)}</ul>
      </div>
    );
  }
  
  export default TodoLists;