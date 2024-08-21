import { useState } from "react"
import styled from "styled-components"
type Row = {
    field: string,
    value: string,
    disabled: boolean,
    onClick: () => void
}

const RowWrapper = styled.div`

`

function EditableRow({onClick, disabled,  field, value} : Row ){
    const [ toggleRow, setToggleRow ] = useState(true)
    return (
        <RowWrapper onClick={(e) => {

            setToggleRow(false)
            console.log(e.target)
        }}>
            <div></div>
            <input  disabled={toggleRow} type="text" defaultValue={value} />
        </RowWrapper>
    )
}

export default EditableRow