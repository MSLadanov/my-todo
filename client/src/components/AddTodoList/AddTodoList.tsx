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
    function handleTitleInput(e : React.FormEvent<HTMLInputElement>, id : string){
        console.log(e.currentTarget.value, id)
    }
    return(
    <div>
        <h1>Add todo</h1>
        {newTodoList.todos.map((el) => <div><input value={el.title} onChange={(e) => handleTitleInput(e, el.id)} /></div>)}
    </div>)
}

export default AddTodoList