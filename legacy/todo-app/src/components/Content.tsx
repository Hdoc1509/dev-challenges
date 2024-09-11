import { useFilterStore } from "../store/filter";
import { useTodos } from "../hooks/useTodos";
import { GeneralActions } from "./GeneralActions";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { FILTER_METHODS } from "../utils";
import "./Content.scss";

export function Content() {
  const { todos } = useTodos();
  const filter = useFilterStore((s) => s.filter);

  const filteredTodos = todos.filter((todo) => FILTER_METHODS[filter](todo));

  return (
    <main data-filter={filter}>
      <TodoForm />
      <TodoList todos={filteredTodos} />
      <GeneralActions />
    </main>
  );
}
