import { useEffect, useState } from "react";
import "./index.css";
import "./animation.css";
import "./navbar.css";

type Todo = {
  content: string;
  complete: boolean;
  schedule: string;
  priority: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [prio, setprio] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [time, setTime] = useState<string>("");

  function addTodo() {
    if (!todo) {
      alert("No todo!");
      return;
    }

    const newTodos: Todo[] = [
      { content: todo, complete: false, schedule: time, priority: false},
      ...todos,
    ];
    setTodos(newTodos);
  }
  function editTodo(index: number){
    const newContent = prompt("Enter the new plan");
    const newTime = prompt("Enter the new schedule");
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          content: ""+newContent,
          complete: todo.complete,
          schedule: ""+newTime,
          priority: todo.priority,
        }
      }
      return todo;
    });
    setTodos(newTodos);
  }
  // function shuffleTodo(index: number){
  //   const newIndex = prompt("Enter the new index")
  //   const newTodos = todos.map((todo, i) => {
  //     if (i === index) {
  //       todos.map.get(i)
  //     }
  //     return todo;
  //   });
  // }
  const [color, setColor] = useState("");
  // const prioritizeTodo = (a) => {
  //   setColor(color);
  // }
  function prioritizeTodo(index: number){
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          content: todo.content,
          complete: todo.complete,
          schedule: todo.schedule,
          priority: !todo.priority,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  }
  function removeTodo(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function toggleTodo(index: number) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          content: todo.content,
          complete: !todo.complete,
          schedule: todo.schedule,
          priority: todo.priority,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  return (
    <>
      <div className="navBar">
        <img src="webLogo.png" alt="" className="imgLogo"/>
        <div className="webname">Todoist</div>
        <div className="navBox">
          <a href="">Home</a>
        </div>
        <div className="navBox">
          <a href="">About</a>
        </div>
        <div className="navBox">
          <a href="">Help</a>
        </div>
      </div>
      {/* <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div> */}
      <div className="App bg-zinc-900 min-w-screen min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="flex gap-4 w-2/3">
          <input
            type="text"
            placeholder="Enter todo"
            onChange={(e) => setTodo(e.target.value)}
            className="focus:outline-none bg-zinc-200 text-zinc-900 rounded-lg p-2 w-full"
          />
          <input
            type="time"
            placeholder="Enter Time"
            onChange={(e) => setTime(e.target.value)}
            className="focus:outline-none bg-zinc-200 text-zinc-900 rounded-lg p-2 w-full timeBox"
          />
          <button
            onClick={() => addTodo()}
            className="bg-zinc-200 text-zinc-900 rounded-lg p-2 px-4"
          >
            Add
          </button>
        </div>
        <div className="todo-container flex flex-col justify-center gap-2 w-2/3">
          {todos.map((todo, i) => (
            <div key={i} className="flex justify-between items-center w-full">
              <div className={`flex gap-2 justify-center items-center parentDiv ${todo.priority && "bg-red-700 text-white"}`} >

                <input
                className="check"
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => toggleTodo(i)}
                />

                <div className="todoBox">
                  <p
                    className={`text-zinc-100 text-lg
                    ${todo.complete && "line-through"}
                    `}
                  >
                    {todo.content}
                  </p>
                  <p
                    className={`text-zinc-100 text-lg
                    ${todo.complete && "line-through"}
                    `}
                  >
                    Scheduled Time: {todo.schedule}
                  </p>
                </div>
              </div>

              <button
                className="bg-red-500 px-4 py-2 rounded-lg"
                onClick={() => removeTodo(i)}
              >
                Delete
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-lg"
                onClick={() => editTodo(i)}
              >
                Edit
              </button>
              {/* <button
                className="bg-red-500 px-4 py-2 rounded-lg"
                onClick={() => shuffleTodo(i)}
              >
                Shuffle
              </button> */}
              <button
                className="bg-red-500 px-4 py-2 rounded-lg"
                onClick={() => prioritizeTodo(i)}
              >
                Prioritize
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
