import { useState } from "react"
type Row = {
    field: string,
    value: string,
    disabled: boolean,
    onClick: () => void
}

function EditableRow({onClick, disabled,  field, value} : Row ){

    return (
        <input onClick={onClick} disabled type="text" defaultValue={value} />
    )
}

export default EditableRow