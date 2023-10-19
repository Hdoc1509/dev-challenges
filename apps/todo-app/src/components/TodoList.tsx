import { TodoItem } from "./TodoItem";
import { Button } from "@hdoc/react-button";
import type { Todo } from "../types";
import "./TodoList.scss";

export const TodoList = ({ todos = [] }: { todos: Todo[] }) => {
  return (
    <div className="todo-container">
      <form className="todo-form">
        <input type="text" placeholder="Add details" />
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
