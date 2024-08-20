import { useState } from "react"
type Row = {
    field: string,
    value: string,
}

function EditableRow({field, value} : Row ){
    const [ toggleInput, setToggleInput ] = useState(true)
    return (
        <input disabled={toggleInput} type="text" defaultValue={value} onClick={() => console.log('click')} />
    )
}

export default EditableRow