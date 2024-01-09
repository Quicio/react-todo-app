import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSharp } from "@fortawesome/free-brands-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

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
    setTodo('')
    
  }

  function removeTodo(index: number) {
    // todos.splice(index, 1);
    const newTodos = [ ...todos ];
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
      <div className="flex gap-4 w-2/3">
        <input
          type="text"
          placeholder="Enter todo"
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTodo();
              setTodo('')
            }
          }

        }
        
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

            <button className="bg-red-500 px-4 py-2 rounded-lg" onClick={() => removeTodo(i)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        ))}
      <button
        className="bg-zinc-200 text-zinc-900 rounded-lg p-2 px-4 mt-2 self-start"
        onClick={() => removeAllTodos()}
      >
        Remove all todos
      </button>
      </div>
    </div>
  );
}

export default App;


// i have added a remove all todo button to delete all the todos. I also added font awesome for add and delete buttons.. I also implemented a feature so that  we just have to press enter after writing a todo. No need to press the + button.
