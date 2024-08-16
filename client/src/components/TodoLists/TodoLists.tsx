import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MiddleBar = styled.div`
  top: 50px;
  height: 50px;
  width: 100%;
  position: fixed;
  background-color: white;
  & h1{
    margin: 0px;
  }
`

const TodoListItem = styled.div`
      display: block;
    `
    const TodoListUl = styled.ul`
      padding: 0;
    `

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
    const query = useQuery({ queryKey: ['todolists'], queryFn: getTodoLists })
    return (
      <div>
        <MiddleBar>
          <h1>TodoLists</h1>
        </MiddleBar>
        <Link to={'/addtodolist'}>AddTodo</Link>
        <TodoListUl>{query.data?.map((todoList : ITodoList) => <TodoListItem key={todoList.id}><Link to={`${path}/${todoList.id}`} key={todoList.id}>{todoList.name}</Link></TodoListItem>)}</TodoListUl>
      </div>
    );
  }
  
  export default TodoLists;