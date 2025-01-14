import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const HandleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container  mx-auto my-8 rounded-xl p-5 bg-violet-100 min-h-[85vh] w-10/12 shadow-md"> 
        <div className="addtodo  ">
          <h2 className="text-lg font-semibold my-3 text-slate-600  bg-violet-200 p-2 rounded-md shadow-sm">
            Add a Todo
          </h2>
          <div className="flex justify-between items-center px-4 ">
            <input
              onChange={HandleChange}
              value={todo}
              type="text"
              className="w-10/12 p-2 bg-violet-200 border border-violet-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />

            <button
              onClick={handleAdd} disabled={todo.length <= 2}
              className="px-4 py-2  bg-violet-200 text-violet-800 font-semibold rounded-lg shadow-md hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              {" "}
              Add
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold my-3 text-slate-600  bg-violet-200 p-2 rounded-md shadow-sm">
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-lg font-semibold text-slate-600 m-5 ">
              No Todos to Display
            </div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between items-center px-4 rounded-lg my-4 "
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={todo.iscompleted}
                    className="mr-4 "
                  />
                  <div className={item.iscompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-4 h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="px-4 py-2 bg-violet-200 text-violet-800 font-semibold rounded-lg shadow-md hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="px-4 py-2 bg-violet-200 text-violet-800 font-semibold rounded-lg shadow-md hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
