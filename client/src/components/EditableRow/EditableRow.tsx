import { useState } from "react"
import styled from "styled-components"

type Row = {
    field: string,
    value: string,
    disabled: boolean,
    onClick: () => void
}

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
  border: 1px solid #ccc;
  outline: none;
  &:hover {
    border-color: ${(props) => (props.readOnly ? '#888' : '#555')};
  }
`;

function EditableRow ({onClick, disabled, field, value} : Row) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const initialValue = value
  function handleClick () {
    setIsReadOnly(false);
  };
  function handleBlur(){
    console.log('Loose focus')
  }
  return (
    <StyledInput
      defaultValue={value}
      type="text"
      readOnly={isReadOnly}
      onClick={handleClick}
      onBlur={handleBlur}
    />
  );
};

export default EditableRow;