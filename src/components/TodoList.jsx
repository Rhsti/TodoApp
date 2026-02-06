import React, { useState } from 'react'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiEditLine } from "react-icons/ri";

function TodoList({tasks, Delete, ToggleComplete, EditTask}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDueDate(task.dueDate || "");
    setEditCategory(task.category || "General");
    setEditPriority(task.priority || "Medium");
  };

  const saveEdit = (id) => {
    if (editText.trim().length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }
    EditTask(id, {
      text: editText,
      dueDate: editDueDate,
      category: editCategory,
      priority: editPriority
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ff6b6b';
      case 'Medium': return '#ffd93d';
      case 'Low': return '#6bcf7f';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString, completed) => {
    if (!dateString || completed) return false;
    return new Date(dateString) < new Date();
  };
  
  return (
    <div className='todo-section'>
      <h2 className='todo-title'>Your Tasks</h2>
      <div className="todo-list-wrapper">
        {tasks.length === 0 ? (
          <div className='empty-state'>
            <p>✨ No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <li 
                className={`list-group-item ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate, task.completed) ? 'overdue' : ''}`} 
                key={task.id}
              >
                {editingId === task.id ? (
                  <div className="edit-mode">
                    <div className="edit-form mb-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="form-control form-control-sm mb-2"
                        maxLength={100}
                      />
                      <div className="row g-2">
                        <div className="col-6">
                          <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="form-select form-select-sm"
                          >
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🔴 High</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-12">
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="Category"
                            className="form-control form-control-sm"
                            maxLength={20}
                          />
                        </div>
                      </div>
                      <div className="mt-2 d-flex gap-2">
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="btn btn-success btn-sm flex-grow-1"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn btn-secondary btn-sm flex-grow-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-content">
                      <div className="d-flex align-items-start gap-3 flex-grow-1">
                        <button  
                          onClick={() => ToggleComplete(task.id)} 
                          className='btn-check'
                          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {task.completed ? 
                            <RiCheckboxCircleFill color='#27ae60' fontSize={24}/> 
                          : 
                            <RiCheckboxBlankCircleLine color='#bdc3c7' fontSize={24}/> 
                          }
                        </button>
                        
                        <div className="flex-grow-1 task-info">
                          <div className="task-main">
                            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                              {task.text}
                            </span>
                          </div>
                          
                          <div className="task-meta mt-2">
                            {task.priority && (
                              <span className="badge badge-priority" style={{backgroundColor: getPriorityColor(task.priority)}}>
                                {task.priority}
                              </span>
                            )}
                            
                            {task.category && task.category !== 'General' && (
                              <span className="badge badge-category">
                                📁 {task.category}
                              </span>
                            )}
                            
                            {task.dueDate && (
                              <span className={`badge ${isOverdue(task.dueDate, task.completed) ? 'badge-danger' : 'badge-info'}`}>
                                {isOverdue(task.dueDate, task.completed) ? '⚠️ ' : '📅 '}
                                {formatDate(task.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="action-buttons ms-3">
                        <button  
                          onClick={() => startEdit(task)}
                          className='btn-edit'
                          title='Edit task'
                        >
                          <RiEditLine fontSize={20} />
                        </button>
                        <button 
                          onClick={() => Delete(task.id)} 
                          className='btn-delete'
                          title='Delete task'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default React.memo(TodoList)