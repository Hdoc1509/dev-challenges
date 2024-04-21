import { TodoItem } from "./TodoItem";
import { Button } from "@hdoc/react-button";
import type { Todo } from "../types";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
  removeTodo: (id: number) => void;
  removeCompleted: () => void;
  toggleCompleted: (id: number) => void;
};

export const TodoList = ({
  todos,
  removeTodo,
  removeCompleted,
  toggleCompleted,
}: Props) => {
  return (
    <>
      <ul className="todo-list">
        {todos.length === 0 ? (
          <span>No todos. ¯\_(ツ)_/¯</span>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleCompleted(todo.id)}
              onRemove={() => removeTodo(todo.id)}
            />
          ))
        )}
      </ul>
      <Button
        className="todo-delete-all"
        text="Delete all"
        color="danger"
        iconStart="delete"
        iconVariant="outlined"
        onClick={() => removeCompleted()}
      />
    </>
  );
};
