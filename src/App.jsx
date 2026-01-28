import { useCallback, useEffect, useState } from 'react'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
 

function App() {
  const [task, setTask] = useState( () => {
    let storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  }, []);
  const HandelTask = useCallback((newTask) => {
    setTask([...task, newTask]);
  }, [task]);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }, [task]);
  return (
    <div className='container'>
      <TodoAdd Heading='Todo List' HandelTask={HandelTask}/>
      <TodoList tasks={task} Heading='Todo List'/>
    </div>
  )
}

export default App
