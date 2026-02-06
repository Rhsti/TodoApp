import React from 'react'
import { RiSearchLine, RiDownloadCloud2Line, RiUploadCloud2Line } from 'react-icons/ri'

function TodoFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  categories,
  exportTasks,
  importTasks,
  taskCount
}) {
  return (
    <div className='filter-section mb-4'>
      <div className="row g-2 align-items-end">
        {/* Search Bar */}
        <div className="col-12 col-md-6">
          <div className="search-box">
            <RiSearchLine className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-6 col-md-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select form-select-sm filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="col-6 col-md-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="form-select form-select-sm filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>
      </div>

      {/* Category and Export/Import */}
      <div className="row g-2 align-items-center mt-2">
        <div className="col-12 col-md-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-select form-select-sm filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Export/Import Buttons */}
        <div className="col-12 col-md-6">
          <div className="d-flex gap-2">
            <button 
              onClick={exportTasks}
              className="btn btn-export btn-sm flex-grow-1"
              title="Export tasks as JSON"
            >
              <RiDownloadCloud2Line className="me-1" />
              Export
            </button>
            <label className="btn btn-import btn-sm flex-grow-1 m-0">
              <RiUploadCloud2Line className="me-1" />
              Import
              <input 
                type="file" 
                accept=".json"
                onChange={importTasks}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Task Count */}
        <div className="col-12">
          <p className="task-count">📊 Showing {taskCount} task{taskCount !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TodoFilter)
