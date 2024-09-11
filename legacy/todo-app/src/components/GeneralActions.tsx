import { useTodos } from "../hooks/useTodos";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import "./GeneralActions.scss";

export const GeneralActions = () => {
  const { removeCompletedTodos } = useTodos();

  return (
    <Button
      className="todo-delete-all"
      color="error"
      iconStart={<Icon name="delete" variant="outlined" />}
      onClick={removeCompletedTodos}
    >
      Delete all
    </Button>
  );
};
