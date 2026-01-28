import React from 'react'

function TodoList({Heading, tasks}) {
  return (
   <>
   <h1 className='h2'>{Heading}</h1>
   <ul className="list-group mt-3 w-50 ">
{tasks.map((task,index) => (
      <li className="list-group-item" key={index}>{task}</li>
))}
  </ul>
   </>
  )
}

export default React.memo(TodoList)