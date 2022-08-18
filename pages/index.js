import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx !== 0) {
      var temp = todos[idx];
      todos[idx] = todos[idx - 1];
      todos[idx - 1] = temp;
      const upTodos = [...todos];
      setTodos(upTodos);
    }
  };

  const moveDown = (idx) => {
    if (idx !== todos.length - 1) {
      var temp = todos[idx];
      todos[idx] = todos[idx + 1];
      todos[idx + 1] = temp;
      const downTodos = [...todos];
      setTodos(downTodos);
    }
  };

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const onKeyUpHandler = (event) => {
    if (event.key !== "Enter") return;
    if (todoInput === "") alert("Todo cannot be empty");
    setTodos([{ title: todoInput, completed: false }, ...todos]);
    setTodoInput("");
  };

  const [isFirstRender, setIsFirstRander] = useState(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRander(false);
      return;
    }
    saveTodos();
  }, [todos]);

  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (!todoStr) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todoStr));
    }
  }, []);

  const saveTodos = () => {
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todosStr);
  };
  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(event) => setTodoInput(event.target.value)}
          value={todoInput}
          onKeyUp={onKeyUpHandler}
        />
        {/* {todos.map((element) => (
          <Todo title={element.title} completed={element.completed} />
        ))} */}
        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            key={i}
            onDelete={() => deleteTodo(i)}
            onMark={() => markTodo(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}
        {/* Todos */}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((x) => x.completed === false).length}) 
          </span>
          <span className="text-success">
            Completed ({todos.filter((x) => x.completed === true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Pattharapon Takham 640610656
        </p>
      </div>
    </div>
  );
}
