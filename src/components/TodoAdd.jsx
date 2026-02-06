import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

function TodoAdd({ HandelTask }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const HandelInput = (e) => {
    e.preventDefault();
    if (input.trim().length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }
    
    HandelTask({
      text: input,
      dueDate: dueDate || null,
      category: category,
      priority: priority
    });
    
    setInput("");
    setDueDate("");
    setCategory("General");
    setPriority("Medium");
    setShowAdvanced(false);
  };

  return (
    <div className='form-section'>
      <form onSubmit={HandelInput}>
        <div className="row justify-content-center g-3 align-items-end">
          <div className="col-12 col-md-10">
            <div className="form-floating">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-control"
                id="floatingInput"
                placeholder="Add your new todo"
                required
                minLength={3}
                maxLength={100}
              />
              <label htmlFor="floatingInput">What's on your mind?</label>
            </div>
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button type="submit" className="btn btn-submit w-100">
              Add
            </button>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-toggle-advanced"
          >
            {showAdvanced ? '✕ Hide Options' : '⚙️ Show Options'}
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="advanced-options mt-3 p-3 border rounded">
            <div className="row g-2">
              {/* Priority */}
              <div className="col-6 col-md-4">
                <label className="form-label text-sm">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
              </div>

              {/* Category */}
              <div className="col-6 col-md-4">
                <label className="form-label text-sm">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Work, Personal"
                  className="form-control form-control-sm"
                  maxLength={20}
                />
              </div>

              {/* Due Date */}
              <div className="col-12 col-md-4">
                <label className="form-label text-sm">Due Date (Optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TodoAdd;
