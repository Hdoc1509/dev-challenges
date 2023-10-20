import { TodoItem } from "./TodoItem";
import { Button } from "@hdoc/react-button";
import type { Todo } from "../types";
import type { Filter } from "../utils";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  removeCompleted: () => void;
  toggleCompleted: (id: number) => void;
  filter: Filter;
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
  filter,
}: Props) => {
  const isCompletedTab = filter === "completed";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & TodoForm;

    addTodo(target.todo.value);
    target.reset();
  };

  return (
    <div className="todo-container" data-filter={filter}>
      {!isCompletedTab && (
        <form className="todo-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Add a todo" name="todo" />
          <Button text="Add" color="primary" />
        </form>
      )}
      <ul className="todo-list" data-filter={filter}>
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
      {isCompletedTab && (
        <Button
          className="todo-container__delete-all"
          text="Delete all"
          color="danger"
          iconStart="delete"
          iconVariant="outlined"
          onClick={() => removeCompleted()}
        />
      )}
    </div>
  );
};
