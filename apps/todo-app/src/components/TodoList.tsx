import { TodoItem } from "./TodoItem";
import type { Todo } from "../types";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
  removeTodo: (id: number) => void;
  toggleCompleted: (id: number) => void;
};

export const TodoList = ({ todos, removeTodo, toggleCompleted }: Props) => {
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
