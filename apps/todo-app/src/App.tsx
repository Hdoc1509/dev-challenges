import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { todos as defaultTodos } from "./data";
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(defaultTodos);

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map((t) => t.id)) + 1,
        title,
        completed: false,
      },
    ]);
  };

  return (
    <>
      <Header title="#todo" nav={<Nav />} />
      <main>
        <TodoList todos={todos} addTodo={addTodo} />
      </main>
      <Footer />
    </>
  );
}

export default App;
