import { Button } from "@hdoc/react-button";
import './TodoForm.scss';

type FormFields = {
  todo: { value: string };
};

type Props = {
  addTodo: (title: string) => void;
};

export const TodoForm = ({ addTodo }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & FormFields;

    addTodo(target.todo.value);
    target.reset();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a todo" name="todo" required />
      <Button text="Add" color="primary" />
    </form>
  );
};
