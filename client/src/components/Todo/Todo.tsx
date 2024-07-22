import React from 'react'
import styled from 'styled-components'

interface TodoProps {
    id: string,
    title: string,
    completed: boolean,
    completeTodo: (value: boolean, id: string) => void
    removeTodo: () => void
}

function Todo({id, title, completed, completeTodo, removeTodo} : TodoProps) {
  const TodoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    & div{
        display:flex;
    }
    `
  const TodoCheckBoxContainer = styled.div`
    align-items: center;
    & input{
        transform: scale(2);
    }
    `
  const TodoTitleContainer = styled.div`

  `
  const TodoButtonContainer = styled.div`
    align-items: center;
    & button{
        height: 50%;
    }
  `
  return (
    <TodoContainer>
        <TodoCheckBoxContainer>
            <input type='checkbox' onChange={(e) => {completeTodo(e.currentTarget.checked, id)}}></input>
        </TodoCheckBoxContainer>
        <TodoTitleContainer>
            <p>{title}</p>
        </TodoTitleContainer>
        <TodoButtonContainer>
            <button>&#10060;</button>
        </TodoButtonContainer>
    </TodoContainer>
  )
}

export default Todo