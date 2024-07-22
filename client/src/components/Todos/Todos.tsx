import { useEffect, useState } from 'react';
import { db, auth} from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '../..';
import Todo from '../Todo/Todo';

function Todos() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }
  interface ITodo {
    id:string, 
    title: string,
    completed: boolean
  }
  let { todoListId } = useParams();
  const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getTodoList(){
      return get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const todos = snapshot.val().todoLists
          const todosId = todos.findIndex((todo : ITodo) => todo.id == todoListId)
          return get(child(dbRef, `/todos/${userId}/todoLists/${todosId}/todos`)).then((snapshot) => {
            if (snapshot.exists()) {
              return snapshot.val();
            } else {
              return [];
            }
          }).catch((error) => {
            console.error(error);
          });
          return snapshot.val().todos;
        } else {
          return [];
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodoList })
  // const complete = useMutation({
  //   mutationFn: completeTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })
  // const remove = useMutation({
  //   mutationFn: removeTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })
  console.log(query.data)
  function completeTodo(value : boolean, id : string){
    console.log(value, id)
  }
  function removeTodo(){
    
  }
  return (
    <div>
      <h1>Todos</h1>
      <ul>{query.data?.map((todo : ITodo) => <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} completeTodo={completeTodo} removeTodo={removeTodo}></Todo>)}</ul>
    </div>
  );
}

export default Todos;