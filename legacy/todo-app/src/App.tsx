import { useTodos } from "./hooks/useTodos";
import { useFilterStore } from "./store/filter";
import { Footer, HeaderWithTheme as Header } from "@lib/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { GeneralActions } from "./components/GeneralActions";
import { FILTER_METHODS } from "./utils";
import "./App.scss";

function App() {
  const { todos } = useTodos();
  const filter = useFilterStore((s) => s.filter);

  const filteredTodos = todos.filter((todo) => FILTER_METHODS[filter](todo));

  return (
    <>
      <Header title="#todo" nav={<Nav />} />
      <main data-filter={filter}>
        <TodoForm />
        <TodoList todos={filteredTodos} />
        <GeneralActions />
      </main>
      <Footer />
    </>
  );
}

export default App;
