import { useState } from "react";
import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { FILTERS, type Filter } from "./utils";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, addTodo, removeTodo, removeCompletedTodos, toggleCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => FILTERS[filter](todo));

  return (
    <>
      <Header title="#todo" nav={<Nav setPath={setFilter} path={filter} />} />
      <main data-filter={filter}>
        <TodoList
          todos={filteredTodos}
          addTodo={addTodo}
          removeTodo={removeTodo}
          removeCompleted={removeCompletedTodos}
          toggleCompleted={toggleCompleted}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
