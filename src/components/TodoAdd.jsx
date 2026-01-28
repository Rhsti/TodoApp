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
      <h1 className="h1 pb-4 mt-5 text-center">{Heading}</h1>
     <form onSubmit={HandelInput} className="text-center">
       <div className="form-floating mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control w-50 mx-auto"
          id="floatingInput"
          placeholder="Add your new todo"
        />
      </div>
      <button type="submit" className="btn btn-outline-primary m-3 p-2">Add Todo</button>
     </form>

    </>
  );
}

export default TodoAdd;
