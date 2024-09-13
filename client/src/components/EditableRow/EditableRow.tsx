import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDatabase, ref, set } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

type Row = {
  field: string,
  value: string,
  id: string,
};

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 300px;
  &:hover {
    border-color: ${(props) => (props.readOnly ? '#888' : '#555')};
  }
  &:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 300px;
  &:hover {
    border-color: ${(props) => (props.readOnly ? '#888' : '#555')};
  }
  &:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

function EditableRow({ field, value, id }: Row) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const initialValue = value;
  const [editableValue, setEditableValue] = useState(value);

  function handleClick() {
    setIsReadOnly(false);
  };

  function handleBlur() {
    const db = getDatabase();
    if (editableValue !== initialValue) {
      set(ref(db, `/users/${id}/${field}/`), editableValue);
      const auth = getAuth();
      const user = auth.currentUser;
      if (field === 'name' && user) {
        updateProfile(user, { displayName: editableValue });
      }
    }
  }

  useEffect(() => {
    setEditableValue(value);
  }, [value]);

  if (field !== 'about') {
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
    return (
      <StyledTextarea
        defaultValue={editableValue}
        onChange={(e) => setEditableValue(e.target.value)}
        readOnly={isReadOnly}
        onClick={handleClick}
        onBlur={handleBlur}
        className={field}
      />
    );
  }
};

export default EditableRow;
