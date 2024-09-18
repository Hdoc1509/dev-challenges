import { useMemo } from "react";
import { useFilterStore } from "../store/filter";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { FILTER_METHODS } from "../utils";
import "./TodoList.scss";

export const TodoList = () => {
  const { todos, removeTodo, toggleCompleted } = useTodos();
  const filter = useFilterStore((s) => s.filter);

  const filteredTodos = useMemo(
    () => todos.filter((todo) => FILTER_METHODS[filter](todo)),
    [filter, todos],
  );

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
