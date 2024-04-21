import { clsx } from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { Todo } from "../types";
import "./TodoItem.scss";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
};

export const TodoItem = ({ todo, onToggle, onRemove }: Props) => {
  const { title, completed } = todo;

  const itemClassName = clsx("todo-item", {
    "todo-item--completed": completed,
  });
  const checkboxClassName = clsx("todo-item__checkbox", {
    "todo-item__checkbox--checked": completed,
  });

  return (
    <li className={itemClassName}>
      <label>
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
      {completed && (
        <span className="todo-item__delete" onClick={() => onRemove()}>
          <Icon name="delete" variant="outlined" />
        </span>
      )}
    </li>
  );
};
