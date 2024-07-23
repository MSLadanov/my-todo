import { useState } from "react"
import {v4 as uuidv4} from 'uuid'

function AddTodoList(){
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
    function addTodoField(){
        const updatedTodoFields = [...newTodoList.todos, {
            id: uuidv4(),
                title: '',
                completed: false
        }]
        setNewTodoList({...newTodoList, todos: updatedTodoFields})
    }
    function handleTitleInput(e : React.FormEvent<HTMLInputElement>, id : string){
        console.log(e.currentTarget.value, id)
    }
    function removeTodoField(id: string){
        let todos = newTodoList.todos
        todos = todos.filter((item) => item.id !== id)
        setNewTodoList({...newTodoList, todos })
    }
    return(
    <div>
        <h1>Add todo</h1>
        <button onClick={addTodoField}>Add todo</button>
        {newTodoList.todos.map((el) => <div key={el.id}><input type="text" onChange={(e) => handleTitleInput(e, el.id)} /><button disabled={newTodoList.todos.length == 1} onClick={() => removeTodoField(el.id)}>&#10060;</button></div>)}
    </div>)
}

export default AddTodoList