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

`

const Input = styled.input`
    & .disabled{
    background-color: #DDD;
    color: #999;
}
`

function EditableRow({onClick, disabled,  field, value} : Row ){
    const [ toggleRow, setToggleRow ] = useState(true)
    return (
        <RowWrapper onClick={(e) => {
            setToggleRow(toggleRow => !toggleRow)
            console.log(e.target)
        }}>
            <InputCover></InputCover>
            <Input className="disabled" type="text" defaultValue={value} value={value} />
        </RowWrapper>
    )
}

export default EditableRow