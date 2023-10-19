import { clsx } from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { Todo } from "../types";
import "./TodoItem.scss";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { id, title, completed } = todo;

  const className = clsx("todo-item", {
    "todo-item--completed": completed,
  });
  const checkboxClassName = clsx("todo-item__checkbox", {
    "todo-item__checkbox--checked": completed,
  })

  return (
    <label className={className}>
      <input type="checkbox" defaultChecked={completed} />
      <span className={checkboxClassName}>
        <Icon name="check" variant="round" />
      </span>
      {title}
    </label>
  );
};
