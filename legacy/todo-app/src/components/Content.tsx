import { useFilterStore } from "../store/filter";
import { GeneralActions } from "./GeneralActions";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import "./Content.scss";

export function Content() {
  const filter = useFilterStore((s) => s.filter);

  return (
    <main data-filter={filter}>
      <TodoForm />
      <TodoList />
      <GeneralActions />
    </main>
  );
}
