import { useFilterStore } from "../store/filter";
import { useTodosStore } from "../store/todos";
import { TodoItem } from "./TodoItem";
import { FILTER_METHODS } from "../utils";
import "./TodoList.scss";

export const TodoList = () => {
  const todos = useTodosStore((s) => s.todos);
  const filter = useFilterStore((s) => s.filter);
  const toggleCompleted = useTodosStore((s) => s.toggleCompleted);
  const removeTodo = useTodosStore((s) => s.removeTodo);

  const filteredTodos = todos.filter((todo) => FILTER_METHODS[filter](todo));

  if (filteredTodos.length === 0) return <span>No todos. ¯\_(ツ)_/¯</span>;

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleCompleted(todo.id)}
          onRemove={() => removeTodo(todo.id)}
        />
      ))}
    </ul>
  );
};
