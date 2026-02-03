import { useCallback, useEffect, useState } from 'react'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
 

function App() {
  const [task, setTask] = useState( () => {
    let storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  }, []);
  const HandelTask = useCallback((newTask) => {
    const newId = Date.now(); // Simple unique ID generator
    setTask([...task, { id: newId, text: newTask, completed: false }]);
  }, [task]);
 
  function ToggleComplete(id) {
    const newTasks = task.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ); 
    setTask(newTasks);
  } 
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }, [task]);

  function DeleteTask(id){
    const newTasks = task.filter((t) => t.id !== id);
    setTask(newTasks);
  }
  function heading(){
    if( 7 > 12){
      return 'Good Morning'
    }else if( 12 > 18){
      return 'Good Afternoon'
    }else if (18 <= 23){
      return 'Good Evening' 
  }else{
      return 'Good Night'
    }
  }
  return (
    <div className='container'>
      <TodoAdd Heading={heading()} HandelTask={HandelTask}/>
      <TodoList tasks={task} Heading='Todo List'
       Delete={DeleteTask} ToggleComplete={ToggleComplete}/>
    </div>
  )
}

export default App
