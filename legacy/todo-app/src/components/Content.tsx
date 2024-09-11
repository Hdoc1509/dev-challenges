import { useFilterStore } from "../store/filter";
import { useTodosStore } from "../store/todos";
import { GeneralActions } from "./GeneralActions";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { FILTER_METHODS } from "../utils";

export function Content() {
  const todos = useTodosStore((s) => s.todos);
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
