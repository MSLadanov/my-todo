import { useState } from "react"
type Row = {
    field: string,
    value: string,
}

function EditableRow({field, value} : Row ){
    const [ toggleInput, setToggleInput ] = useState(true)
    return (
        <input disabled type="text" defaultValue={value} />
    )
}

export default EditableRow