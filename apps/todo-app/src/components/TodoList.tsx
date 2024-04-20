import { TodoItem } from "./TodoItem";
import { Button } from "@hdoc/react-button";
import type { Todo } from "../types";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  removeCompleted: () => void;
  toggleCompleted: (id: number) => void;
};
type TodoForm = {
  todo: { value: string };
};

export const TodoList = ({
  todos = [],
  addTodo,
  removeTodo,
  removeCompleted,
  toggleCompleted,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & TodoForm;

    addTodo(target.todo.value);
    target.reset();
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a todo" name="todo" required />
        <Button text="Add" color="primary" />
      </form>
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
