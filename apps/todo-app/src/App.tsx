import { useState } from "react";
import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { todos as defaultTodos } from "./data";
import { FILTERS, type Filter } from "./utils";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", defaultTodos);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        title,
        completed: false,
      },
    ]);
  };
  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const removeCompletedTodos = () =>
    setTodos(todos.filter((todo) => !todo.completed));

  const filteredTodos = todos.filter((todo) => FILTERS[filter](todo));

  return (
    <>
      <Header title="#todo" nav={<Nav setPath={setFilter} path={filter} />} />
      <main>
        <TodoList
          todos={filteredTodos}
          addTodo={addTodo}
          removeTodo={removeTodo}
          removeCompleted={removeCompletedTodos}
          toggleCompleted={toggleCompleted}
          filter={filter}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
