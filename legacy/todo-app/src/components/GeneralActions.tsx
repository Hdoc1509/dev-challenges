import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import "./GeneralActions.scss";

type Props = {
  removeCompleted: () => void;
};

export const GeneralActions = ({ removeCompleted }: Props) => {
  return (
    <Button
      className="todo-delete-all"
      color="error"
      iconStart={<Icon name="delete" variant="outlined" />}
      onClick={removeCompleted}
    >
      Delete all
    </Button>
  );
};
