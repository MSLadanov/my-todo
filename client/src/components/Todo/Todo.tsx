import styled from 'styled-components'

interface TodoProps {
    id: string,
    title: string,
    completed: boolean,
    complete: any
    remove: any
}

function Todo({id, title, completed, complete, remove} : TodoProps) {
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
            <input type='checkbox' checked={completed} onChange={(e) => complete.mutate({checked: e.currentTarget.checked, id})}></input>
        </TodoCheckBoxContainer>
        <TodoTitleContainer>
            <p>{title}</p>
        </TodoTitleContainer>
        <TodoButtonContainer>
            <button onClick={() => {
              remove.mutate(id)}}>&#10060;</button>
        </TodoButtonContainer>
    </TodoContainer>
  )
}

export default Todo