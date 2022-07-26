import React from 'react'

export function TodoItem({todo, toggleTodo}) {

    const {id,task, completed} = todo;

    const handletodoClick = () => {
        toggleTodo(id);
    };
  return <li>
    <input type="checkbox" checked={completed} onChange={handletodoClick}/>
    {task}
    </li>
    
  
}
