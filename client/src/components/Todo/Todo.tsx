import React from 'react'

interface TodoProps {
    id: string,
    title: string,
    completed: boolean
}

function Todo({id, title, completed} : TodoProps) {
  return (
    <div>Todo</div>
  )
}

export default Todo