import { useState } from "react";

function TodoAdd({ Heading , HandelTask}) {
  let [input, setInput] = useState("");
 const HandelInput = (e) => {
    e.preventDefault();
    console.log(input);
    HandelTask(input);
    setInput("");
 }
  return (
    <>
      <h1 className="h1 pb-3 pb-md-4 mt-4 mt-md-5 text-center">{Heading}</h1>
     <form onSubmit={HandelInput} className="text-center">
       <div className="row justify-content-center mb-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
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
              maxLength={30}
            />
            <label htmlFor="floatingInput">Add your new todo</label>
          </div>
        </div>
       </div>
      <button type="submit" className="btn btn-outline-primary m-2 m-md-3 px-3 px-md-4">Add Todo</button>
     </form>

    </>
  );
}

export default TodoAdd;
