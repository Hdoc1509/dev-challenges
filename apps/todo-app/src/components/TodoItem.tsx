import { clsx } from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { Todo } from "../types";
import "./TodoItem.scss";

type Props = {
  todo: Todo;
  onToggle: () => void;
};

export const TodoItem = ({ todo, onToggle }: Props) => {
  const { title, completed } = todo;

  const className = clsx("todo-item", {
    "todo-item--completed": completed,
  });
  const checkboxClassName = clsx("todo-item__checkbox", {
    "todo-item__checkbox--checked": completed,
  });

  return (
    <label className={className}>
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => onToggle()}
      />
      <span className={checkboxClassName}>
        <Icon name="check" variant="round" />
      </span>
      {title}
    </label>
  );
};
