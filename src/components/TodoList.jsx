import React from 'react'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";

function TodoList({Heading, tasks, Delete, ToggleComplete}) {
  
  return (
   <>
   <h2 className='h2 text-center mt-4 mt-md-5'>{Heading}</h2>
   <div className="row justify-content-center mt-3">
     <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-6">
       <ul className="list-group">
{tasks.map((task) => (
      <li className="list-group-item d-flex align-items-center justify-content-between py-2 py-md-3" key={task.id}>
        <span className="flex-grow-1 text-truncate" style={task.completed ? {textDecoration: 'line-through'} : {}}>
          {task.text}
        </span>
        <div className="d-flex gap-2 ms-2 flex-shrink-0">
          <button  onClick={() => ToggleComplete(task.id)} 
          className='btn btn-sm p-0' style={{background: 'none', border: 'none'}}>
            {task.completed ? 
              <span><RiCheckboxCircleFill color='green' fontSize={24}/></span> 
            : 
              <span><RiCheckboxBlankCircleLine color='green' fontSize={24}/></span> 
            }
          </button>
          <button onClick={() => Delete(task.id)} 
          className='btn btn-outline-danger btn-sm'>Delete</button>
        </div>
      </li>
))}
       </ul>
     </div>
   </div>
   </>
  )
}

export default React.memo(TodoList)