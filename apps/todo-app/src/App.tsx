import { useState } from "react";
import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { GeneralActions } from "./components/GeneralActions";
import { FILTERS, type Filter } from "./utils";
import { useTodos } from "./hooks/useTodos";
import "./App.scss";

function App() {
  const { todos, addTodo, removeTodo, removeCompletedTodos, toggleCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => FILTERS[filter](todo));

  return (
    <>
      <Header title="#todo" nav={<Nav setPath={setFilter} path={filter} />} />
      <main data-filter={filter}>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          removeTodo={removeTodo}
          toggleCompleted={toggleCompleted}
        />
        <GeneralActions removeCompleted={removeCompletedTodos} />
      </main>
      <Footer />
    </>
  );
}

export default App;
