import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get, set } from "firebase/database";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
`;

const Button = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonPanel = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: calc(100% - 22px);
  box-sizing: border-box;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    flex: 1;
    margin-right: 10px;
  }

  button {
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #cc0000;
    }
  }
`;

function AddTodoList() {
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }

  const navigate = useNavigate();
  const userId = useSelector((state: IState) => state.userId);
  const dbRef = ref(getDatabase());
  const [newTodoList, setNewTodoList] = useState({
    id: uuidv4(),
    name: '',
    todos: [
      {
        id: uuidv4(),
        title: '',
        completed: false
      },
      {
        id: uuidv4(),
        title: '',
        completed: false
      }
    ]
  });

  function resetFields() {
    const todos = [
      {
        id: uuidv4(),
        title: '',
        completed: false
      },
      {
        id: uuidv4(),
        title: '',
        completed: false
      }
    ];
    setNewTodoList({ ...newTodoList, todos });
  }

  async function getTodoLists() {
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

  const query = useQuery({ queryKey: ['todolists'], queryFn: getTodoLists });

  function addTodoField() {
    const updatedTodoFields = [...newTodoList.todos, {
      id: uuidv4(),
      title: '',
      completed: false
    }];
    setNewTodoList({ ...newTodoList, todos: updatedTodoFields });
  }

  function handleTitleInput(e: React.FormEvent<HTMLInputElement>, id: string) {
    let todos = newTodoList.todos;
    todos[todos.findIndex((item) => item.id === id)].title = e.currentTarget.value;
    setNewTodoList({ ...newTodoList, todos });
  }

  function removeTodoField(id: string) {
    let todos = newTodoList.todos;
    todos = todos.filter((item) => item.id !== id);
    setNewTodoList({ ...newTodoList, todos });
  }

  function addTodoList() {
    const db = getDatabase();
    const todoLists = [...query.data, newTodoList];
    set(ref(db, `/todos/${userId}/todoLists/`), {
      ...todoLists
    });
    resetFields();
    navigate(-1);
  }

  return (
    <Container>
      <ButtonPanel>
        <Button onClick={addTodoList}>Add TodoList</Button>
        <Button onClick={addTodoField}>Add Todo</Button>
      </ButtonPanel>
      <div>
        <Input
          type="text"
          placeholder="Input todo list name..."
          onChange={(e) => setNewTodoList({ ...newTodoList, name: e.target.value })}
        />
      </div>
      {newTodoList.todos.map((el) => (
        <TodoItem key={el.id}>
          <Input
            type="text"
            placeholder="Todo title..."
            onChange={(e) => handleTitleInput(e, el.id)}
          />
          <button
            disabled={newTodoList.todos.length === 1}
            onClick={() => removeTodoField(el.id)}
          >
            &#10060;
          </button>
        </TodoItem>
      ))}
    </Container>
  );
}

export default AddTodoList;
