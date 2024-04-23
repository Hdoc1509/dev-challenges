import { clsx } from "clsx";
import { Icon } from "@hrc/material-icons";
import { Checkbox } from "@hrc/input";
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
  const labelClassName = clsx({
    "label--checked": completed,
  });

  return (
    <li className={itemClassName}>
      <Checkbox
        label={title}
        labelClassName={labelClassName}
        checked={completed}
        onChange={onToggle}
        color="primary"
      />
      {completed && (
        <span className="todo-item__delete" onClick={onRemove}>
          <Icon name="delete" variant="outlined" />
        </span>
      )}
    </li>
  );
};
