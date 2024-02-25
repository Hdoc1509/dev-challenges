import { Button } from "@hdoc-react/button";
import { Input } from "@hdoc-react/input";
import { Icon } from "@hdoc-react/material-icons";
import "./SearchForm.scss";

type SearchForm = {
  search: { value: string };
  "full-time"?: { value: "on" };
  location: { value: string };
  city: { value: string };
};

export const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & SearchForm;
    console.log(Object.fromEntries(new FormData(target)));
  };

  return (
    <section className="search-form-wrapper">
      <form id="search-form" onSubmit={handleSubmit}>
        <Input
          iconStart={<Icon name="work_outline" />}
          iconEnd={<Button color="primary">Search</Button>}
          placeholder="Title, companies, expertise or benefits"
          name="search"
          fullWidth
        />
      </form>
    </section>
  );
};
