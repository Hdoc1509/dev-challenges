import { useTodosStore } from "../store/todos";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import "./TodoForm.scss";

type FormFields = {
  todo: { value: string };
};

export const TodoForm = () => {
  const addTodo = useTodosStore((s) => s.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & FormFields;

    addTodo(target.todo.value);
    target.reset();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input placeholder="Add a todo" name="todo" fullWidth required />
      <Button color="primary">Add</Button>
    </form>
  );
};
