import { useState } from "react";
import { Footer, HeaderWithTheme as Header } from "@lib/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { GeneralActions } from "./components/GeneralActions";
import { FILTERS, FILTER_METHODS, type Filter } from "./utils";
import { useTodos } from "./hooks/useTodos";
import "./App.scss";

function App() {
  const { todos, removeCompletedTodos } = useTodos();
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);

  const filteredTodos = todos.filter((todo) => FILTER_METHODS[filter](todo));

  return (
    <>
      <Header title="#todo" nav={<Nav setPath={setFilter} path={filter} />} />
      <main data-filter={filter}>
        <TodoForm />
        <TodoList todos={filteredTodos} />
        <GeneralActions removeCompleted={removeCompletedTodos} />
      </main>
      <Footer />
    </>
  );
}

export default App;
