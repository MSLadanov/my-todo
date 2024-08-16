import { useState } from "react"
import {v4 as uuidv4} from 'uuid'
import { useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get, set } from "firebase/database";

function AddTodoList(){
    interface IState {
        displayName: string,
        email: string,
        token: string,
        userId: string | undefined  
      }
    const navigate = useNavigate();
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    const [newTodoList, setNewTodoList] = useState({
        id: uuidv4(),
        name: '',
        todos:[
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
    })
    function resetFields(){
        const todos = [{
            id: uuidv4(),
            title: '',
            completed: false
        },
        {
            id: uuidv4(),
            title: '',
            completed: false
        }]
        setNewTodoList({...newTodoList, todos })
    }
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
    function addTodoField(){
        const updatedTodoFields = [...newTodoList.todos, {
            id: uuidv4(),
                title: '',
                completed: false
        }]
        setNewTodoList({...newTodoList, todos: updatedTodoFields})
    }
    function handleTitleInput(e : React.FormEvent<HTMLInputElement>, id : string){
        let todos = newTodoList.todos
        todos[todos.findIndex((item) => item.id == id)].title = e.currentTarget.value
        setNewTodoList({...newTodoList, todos })
    }
    function removeTodoField(id: string){
        let todos = newTodoList.todos
        todos = todos.filter((item) => item.id !== id)
        setNewTodoList({...newTodoList, todos })
    }
    function addTodoList(){
        console.log(newTodoList)
        const db = getDatabase();
        const todoLists = [...query.data, newTodoList]
        set(ref(db, `/todos/${userId}/todoLists/`), {
            ...todoLists
        })
        resetFields()
        navigate(-1)
    }
    return(
    <div>
        <button onClick={addTodoList}>Add TodoList</button>
        <button onClick={addTodoField}>Add todo</button>
        <div>
            <input type="text" placeholder="input todo list name..." onChange={(e) => setNewTodoList({...newTodoList, name: e.target.value})}/>
        </div>
        {newTodoList.todos.map((el) => <div key={el.id}><input type="text" onChange={(e) => handleTitleInput(e, el.id)} /><button disabled={newTodoList.todos.length == 1} onClick={() => removeTodoField(el.id)}>&#10060;</button></div>)}
    </div>)
}

export default AddTodoList