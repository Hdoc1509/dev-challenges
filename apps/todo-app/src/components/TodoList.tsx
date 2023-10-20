import { TodoItem } from "./TodoItem";
import { Button } from "@hdoc/react-button";
import type { Todo } from "../types";
import "./TodoList.scss";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
};
type TodoForm = {
  todo: { value: string };
};

export const TodoList = ({ todos = [], addTodo }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & TodoForm;

    addTodo(target.todo.value);
    target.reset();
  };

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add details" name="todo" />
        <Button text="Add" color="primary" />
      </form>
      <ul className="todo-list">
        {todos.length === 0 ? (
          <span>No todos</span>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
    </div>
  );
};
