import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../types";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  const { removeTodo, toggleCompleted } = useTodos();

  if (todos.length === 0) return <span>No todos. ¯\_(ツ)_/¯</span>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
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
