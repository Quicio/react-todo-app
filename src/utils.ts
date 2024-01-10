import { Todo } from "./App";

export const getTodos = async () => {
  // returns the todos from our server
  const res = await fetch("http://localhost:8080/todos");
  const todos: Todo[] = await res.json();
  return todos;
};

export const addTodoToDB = async (todo: Todo) => {
  // console.log("todo added!")

  const requestBody = {
    content: todo.content,
    complete: todo.complete ? 1 : 0,
    schedule: "",
    priority: 0,
  };

  const res = await fetch("http://localhost:8080/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return res;
};
