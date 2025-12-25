import { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [all, setall] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [uncompleted, setuncompleted] = useState([]);
  const [AllTodos, setAllTodos] = useState([]);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let tds = JSON.parse(todostring);
      settodos(tds);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const sts = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(sts);
    settodo("");
    saveToLs();
    setAllTodos(sts);
  };
  const handleAll = () => {
    settodos(AllTodos);
  };
  const handleCompleted = () => {
    settodos(completed);
  };
  const handleUncompleted = () => {
    settodos(uncompleted);
  };
  const handleDelete = (e) => {
    let id = e.currentTarget.name;
    settodos((prevtodos) => prevtodos.filter((item) => item.id !== id));
    saveToLs();
  };

  const handleEdit = (e) => {
    let id = e.currentTarget.name;
    let t = todos.filter((item) => item.id === id);
    settodo(t[0].todo);
    settodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    saveToLs();
  };
  const handlechange = (e) => {
    settodo(e.target.value);
    saveToLs();
  };
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    console.log(newtodos);
    if (e.target.checked) {
      newtodos[index].isCompleted = true;
    } else {
      newtodos[index].isCompleted = false;
    }
    settodos(newtodos);
    setall(newtodos);
    setAllTodos(newtodos);
    setcompleted(newtodos.filter((item) => item.isCompleted === true));
    setuncompleted(newtodos.filter((item) => !item.isCompleted));
  };

  return (
    <>
      <div className="body h-screen flex justify-center items-center">
        <div className="container h-100 border-2 rounded-4xl w-135 bg-[#032537] text-white flex flex-col items-center">
          <div className="add_task h-20 flex justify-center items-center m-auto gap-2">
            <input
              onChange={handlechange}
              value={todo}
              placeholder="Type what to do"
              className="bg-[#EEEEEE] text-black p-2 rounded-md h-10 w-70"
              type="text"
            />
            <button
              onClick={handleAdd}
              className="cursor-pointer h-10 w-35 bg-[#008D9E] rounded-md"
            >
              Add
            </button>
          </div>

          <div className="task_show h-15 flex justify-center items-center gap-2">
            <button
              onClick={handleAll}
              className="bg-[#008D9E] w-30 h-9 rounded-lg cursor-pointer"
            >
              All
            </button>
            <button
              onClick={handleCompleted}
              className="bg-[#008D9E] w-30 h-9 rounded-lg cursor-pointer"
            >
              Completed
            </button>
            <button
              onClick={handleUncompleted}
              className="bg-[#008D9E] w-30   h-9 rounded-lg cursor-pointer"
            >
              Uncompleted
            </button>
          </div>
          <div className="line h-0.5 w-110 mt-2  border-black bg-black text-center"></div>
          <div className="todos overflow-y-auto h-50 my-3">
            {todos.length === 0 && <div>No todos to display</div>}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="wraper my-4 flex  rounded-sm h-12 w-120 justify-center items-center  bg-[#009788]"
                >
                  <div
                    className={`w-90 mx-4 ${
                      item.isCompleted ? "line-through decoration-4" : ""
                    }`}
                  >
                    {item.todo}
                  </div>
                  <div className="buttons flex gap-4 items-end justify-center mx-3">
                    <input
                      onChange={handlecheckbox}
                      name={item.id}
                      value={item.isCompleted}
                      type="checkbox"
                      className="self-center w-5 h-5 cursor-pointer border-b-gray-950 accent-[#008D9E]"
                    />
                    <button
                      name={item.id}
                      value={item.isCompleted}
                      className="cursor- self-center text-[#295458] text-xl"
                      onClick={handleEdit}
                    >
                      <FaPencil />
                    </button>
                    <button
                      className="cursor- self-center text-[#295458] text-xl"
                      name={item.id}
                      value={item.isCompleted}
                      onClick={handleDelete}
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
