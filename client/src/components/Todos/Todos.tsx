import { useEffect, useRef, useState } from 'react';
import { db, auth} from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get, set } from "firebase/database";
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
  const [newTodo, setNewTodo] = useState<ITodo>({
    id: uuidv4(),
    title: '',
    completed: false
  })
  let { todoListId } = useParams();
  let todosId = useRef('')
  const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    async function getTodoList(){
      return get(child(dbRef, `todos/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const todos = snapshot.val().todoLists
          todosId.current = todos.findIndex((todo : ITodo) => todo.id == todoListId)
          return get(child(dbRef, `/todos/${userId}/todoLists/${todosId.current}/todos`)).then((snapshot) => {
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
  const complete = useMutation({
    mutationFn: (todo: {checked: boolean, id: string}) => {
      let todos = query.data
      const {checked, id} = todo
      todos[todos.findIndex((item : ITodo) => item.id == id)].completed = checked
      const db = getDatabase();
      return set(ref(db, `/todos/${userId}/todoLists/${todosId.current}/todos`), {
      ...todos
  });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const create = useMutation({
    mutationFn: (todo: ITodo) => {
      let todos = query.data
      todos.unshift(todo)
      const db = getDatabase();
      return set(ref(db, `/todos/${userId}/todoLists/${todosId.current}/todos`), {
      ...todos
  });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const remove = useMutation({
    mutationFn: ( id: string) => {
      let todos = query.data
      todos = todos.filter((item : ITodo) => item.id !== id)
      const db = getDatabase();
      return set(ref(db, `/todos/${userId}/todoLists/${todosId.current}/todos`), {
      ...todos
  });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  function handleNewTodoInput(event: React.FormEvent<HTMLInputElement>){
    setNewTodo({...newTodo, title: event.currentTarget.value})
  }
  // const remove = useMutation({
  //   mutationFn: removeTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })
  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input type="text" value={newTodo.title} onChange={handleNewTodoInput} />
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          create.mutate(newTodo)
          setNewTodo({
            id: uuidv4(),
            title: '',
            completed: false
          })
        }}>Add Todo</button>
      </div>
      <ul>{query.data?.map((todo : ITodo) => <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} complete={complete} remove={remove}></Todo>)}</ul>
    </div>
  );
}

export default Todos;