import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./index.css";

library.add(faLinkedin, faInstagram, faFacebook);

type Todo = {
  content: string;
  complete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  function addTodo() {
    if (!todo.trim()) {
      alert("No todo!");
      return;
    }

    const newTodos: Todo[] = [{ content: todo, complete: false }, ...todos];
    setTodos(newTodos);
    setTodo("");
  }

  function removeTodo(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function removeAllTodos() {
    setTodos([]);
  }

  function toggleTodo(index: number) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { content: todo.content, complete: !todo.complete };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  return (
    <div className="App bg-zinc-900 min-w-screen min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4 w-2/3 mt-60">
        <input
          type="text"
          placeholder="Enter todo"
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTodo();
              setTodo("");
            }
          }}
          className="focus:outline-none bg-zinc-200 text-zinc-900 rounded-lg p-2 w-full"
        />
        <button
          onClick={() => addTodo()}
          className="bg-zinc-200 text-zinc-900 rounded-lg p-2 px-4"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="todo-container flex flex-col justify-center gap-2 w-2/3">
        {todos.map((todo, i) => (
          <div key={i} className="flex justify-between items-center w-full">
            <div className="flex gap-2 justify-center items-center">
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => toggleTodo(i)}
              />
              <p
                className={`text-zinc-100 text-lg
                ${todo.complete && "line-through"}
              `}
              >
                {todo.content}
              </p>
            </div>

            <button
              className="bg-red-500 px-4 py-2 rounded-lg"
              onClick={() => removeTodo(i)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      <button
        className="bg-zinc-200 text-zinc-900 rounded-lg p-2 px-4 mt-2 self-end mr-48"
        onClick={() => removeAllTodos()}
      >
        Remove All Todos
      </button>
      
      <div className="flex-grow"></div>
      <footer className="footer text-zinc-200 text-center p-4 bg-gray-800 w-full flex justify-center">
        <p className="mr-20">&copy; 2024</p>
        <p className="mr-20">Created By: KALYANI GOVERNMENT ENGINEERING COLLEGE</p>
        <div className="ml-4">
          <a href="linkedin-url" target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "linkedin"]} className="text-white mr-2" size="lg"/>
          </a>
          <a href="instagram-url" target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "instagram"]} className="text-white mr-2"size="lg" />
          </a>
          <a href="facebook-url" target="blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "facebook"]} className="text-white" size="lg" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
