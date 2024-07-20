import React from 'react'
import styled from 'styled-components'

interface TodoProps {
    id: string,
    title: string,
    completed: boolean
}

function Todo({id, title, completed} : TodoProps) {
  const TodoContainer = styled.div`
    display: flex;
    `
  const TodoCheckBoxContainer = styled.div`

  `
  const TodoTitleContainer = styled.div`

  `
  const TodoButtonContainer = styled.div`

  `
  return (
    <TodoContainer>
        <TodoCheckBoxContainer>
            <input type='checkbox'></input>
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