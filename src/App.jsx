import { useCallback, useEffect, useState } from 'react'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
 

function App() {
  const [task, setTask] = useState( () => {
    let storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const HandelTask = useCallback((newTaskData) => {
    const newId = Date.now();
    setTask([...task, { 
      id: newId, 
      text: newTaskData.text, 
      completed: false,
      dueDate: newTaskData.dueDate || null,
      category: newTaskData.category || 'General',
      priority: newTaskData.priority || 'Medium',
      createdAt: new Date().toISOString()
    }]);
  }, [task]);

  const EditTask = useCallback((id, updatedData) => {
    const newTasks = task.map((t) => 
      t.id === id ? { ...t, ...updatedData } : t
    );
    setTask(newTasks);
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

  // Filter tasks based on search and filters
  const filteredTasks = task.filter(t => {
    const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && t.completed) ||
      (filterStatus === 'pending' && !t.completed);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const categories = ['General', ...new Set(task.map(t => t.category).filter(c => c && c !== 'General'))];

  const exportTasks = () => {
    const dataStr = JSON.stringify(task, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importTasks = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        if (Array.isArray(importedTasks)) {
          setTask(importedTasks);
          alert('✅ Tasks imported successfully!');
        }
      } catch (error) {
        alert('❌ Error importing tasks. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  function heading(){
    if( 7 > 12){
      return 'Good Morning'
    }else if( 12 < 18){
      return 'Good Afternoon'
    }else if (18 < 23){
      return 'Good Evening' 
  }else{
      return 'Good Night'
    }
  }
  return (
    <div className='app-container'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='header-section mb-5'>
              <h1>{heading()}</h1>
              <p>Stay organized and productive</p>
            </div>
            <div className='row justify-content-center'>
              <div className='col-12 col-lg-8'>
                <TodoAdd HandelTask={HandelTask}/>
                
                <TodoFilter 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterPriority={filterPriority}
                  setFilterPriority={setFilterPriority}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  categories={categories}
                  exportTasks={exportTasks}
                  importTasks={importTasks}
                  taskCount={filteredTasks.length}
                />
                
                <TodoList 
                  tasks={filteredTasks}
                  Delete={DeleteTask} 
                  ToggleComplete={ToggleComplete}
                  EditTask={EditTask}
                  allTasks={task}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
