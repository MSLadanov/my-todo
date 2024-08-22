import { useEffect, useState } from "react"
import styled from "styled-components"
import { getDatabase, ref, child, get, set } from "firebase/database";

type Row = {
    field: string,
    value: string,
    id: string,
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

const StyledTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
  border: 1px solid #ccc;
  outline: none;
  &:hover {
    border-color: ${(props) => (props.readOnly ? '#888' : '#555')};
  }
`;

function EditableRow ({field, value, id} : Row) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const initialValue = value
  const [ editableValue, setEditableValue ] = useState(value)
  function handleClick () {
    setIsReadOnly(false);
  };
  function handleBlur(){
    const db = getDatabase();
    if(editableValue !== initialValue){
      set(ref(db, `/users/${id}/${field}/`), editableValue)
    }
  }
  useEffect(() => {
    setEditableValue(value)
  }, [value])
  if(field !== 'about'){
    return (
      <StyledInput
        defaultValue={editableValue}
        onChange={(e) => setEditableValue(e.target.value)}
        type="text"
        readOnly={isReadOnly}
        onClick={handleClick}
        onBlur={handleBlur}
        className={field}
      />
    );
  } else {
    return(
      <StyledTextarea
        defaultValue={editableValue}
        onChange={(e) => setEditableValue(e.target.value)}
        readOnly={isReadOnly}
        onClick={handleClick}
        onBlur={handleBlur}
        className={field}
      />
    )
  }
};

export default EditableRow;