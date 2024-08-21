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
const InputCover = styled.div`
    position: relative;
    top: 50px;
    height: 50px;
    z-index: 1;
`

const Input = styled.input`
    position: relative;
    height: 50px;
    z-index: 0;
`

function EditableRow({onClick, disabled,  field, value} : Row ){
    const [ toggleRow, setToggleRow ] = useState(true)
    return (
        <RowWrapper onClick={(e) => {
            setToggleRow(false)
            console.log(e.target)
        }}>
            <InputCover></InputCover>
            <Input disabled={toggleRow} type="text" defaultValue={value} />
        </RowWrapper>
    )
}

export default EditableRow