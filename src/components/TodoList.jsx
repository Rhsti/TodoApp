import React from 'react'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";

function TodoList({Heading, tasks, Delete, ToggleComplete}) {
  
  return (
   <>
   <h2 className='h2 text-center'>{Heading}</h2>
   <ul className="list-group mt-3 w-50  mx-auto">
{tasks.map((task) => (
      <li className="list-group-item mt-3" key={task.id}>
        <span style={task.completed ? {textDecoration: 'line-through'} : {}}>
          {task.text}
        </span>
         <button onClick={() => Delete(task.id)} 
        className='btn btn-outline-danger float-end mt-3'>Delete</button>
        <button  onClick={() => ToggleComplete(task.id)} 
        className='btn btn-sm ms-2 float-end mt-3' style={{background: 'none', border: 'none'}}>
          {task.completed ? 
            <span><RiCheckboxCircleFill color='green' fontSize={30}/></span> 
          : 
            <span><RiCheckboxBlankCircleLine color='green' fontSize={30}/></span> 
          }
        </button>
        
      </li>
))}
  </ul>
   </>
  )
}

export default React.memo(TodoList)