import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const TodoList = styled.div`
  & li{
  color: black;
}
`

const TodoListItem = styled.div`
      display: flex;
      align-items: center;
    `
    const TodoListUl = styled.ul`
      padding: 0;
    `
    const LinkStyle = {
      display:'flex', 
      color: 'black',
      textDecoration: 'none', 
      justifyContent:'space-between', 
      margin:'15px 15px'
    }

  const LinkStyleInput = {
    display:'flex', 
      color: 'black',
      textDecoration: 'none', 
      justifyContent:'space-between', 
      margin:'15px 0px'
  }

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
      <TodoList>
        <Link style={LinkStyleInput} to={'/addtodolist'}><FontAwesomeIcon icon={faSquarePen} size='2x'></FontAwesomeIcon></Link>
        <TodoListUl>{query.data?.map((todoList : ITodoList) => <TodoListItem key={todoList.id}><FontAwesomeIcon icon={faList} size='2x'></FontAwesomeIcon> <Link style={LinkStyle} to={`${path}/${todoList.id}`} key={todoList.id}>{todoList.name}</Link></TodoListItem>)}</TodoListUl>
      </TodoList>
    );
  }
  
  export default TodoLists;