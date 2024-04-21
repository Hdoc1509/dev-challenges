import { Button } from "@hdoc/react-button";
import "./GeneralActions.scss";

type Props = {
  removeCompleted: () => void;
};

export const GeneralActions = ({ removeCompleted }: Props) => {
  return (
    <Button
      className="todo-delete-all"
      text="Delete all"
      color="danger"
      iconStart="delete"
      iconVariant="outlined"
      onClick={removeCompleted}
    />
  );
};
