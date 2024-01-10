// Import necessary dependencies and styles
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSharp } from "@fortawesome/free-brands-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

// Define the type for a todo item
type Todo = {
  content: string;
  complete: boolean;
};

// Main component App
function App() {

  // State to manage the list of todos and the current todo input
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

 // Function to add a new todo
  function addTodo() {
    if (!todo.trim()) {
      alert("No todo!");
      return;
    }

   // Create a new array of todos with the new todo at the beginning
    const newTodos: Todo[] = [{ content: todo, complete: false }, ...todos];
    setTodos(newTodos);
    setTodo('')
    
  }

// Function to remove a specific todo by index
  function removeTodo(index: number) {
    // todos.splice(index, 1);
    // Create a new array without the todo at the specified index
    const newTodos = [ ...todos ];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

    // Function to remove all todos
  function removeAllTodos() {
    setTodos([]);
  }

  // Function to toggle the completion status of a todo
  function toggleTodo(index: number) {

     // Create a new array with the toggled completion status
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { content: todo.content, complete: !todo.complete };
      }
      return todo;
    });


    setTodos(newTodos);
  }

  // JSX structure for the component
  return (
    <div className="App bg-zinc-900 min-w-screen min-h-screen flex flex-col justify-center items-center gap-4">
       //div to contain the add button and todo description that you want to add
      <div className="flex gap-4 w-2/3">

      // text input area
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
        
        //add todo button 
        <button
          onClick={() => addTodo()}
          className="bg-zinc-200 text-zinc-900 rounded-lg p-2 px-4"
        >
             <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      //div to contain all the todos
      <div className="todo-container flex flex-col justify-center gap-2 w-2/3">
        {todos.map((todo, i) => (

          //div for each todo in the list full row
          <div key={i} className="flex justify-between items-center w-full">
            <div className="flex gap-2 justify-center items-center">

              //checkbox to mark if a todo is complete
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => toggleTodo(i)}
              />

              //todo gets strikethrough after checkbox tick
              <p
                className={`text-zinc-100 text-lg
                ${todo.complete && "line-through"}
              `}
              >
                {todo.content}
              </p>
            </div>

            //remove the particular todo button
            <button className="bg-red-500 px-4 py-2 rounded-lg" onClick={() => removeTodo(i)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        ))}

      //remove all todos button 
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
