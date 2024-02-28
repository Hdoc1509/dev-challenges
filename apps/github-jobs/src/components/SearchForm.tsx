import { Button } from "@hdoc-react/button";
import { Input } from "@hdoc-react/input";
import { Icon } from "@hdoc-react/material-icons";
import "./SearchForm.scss";

type SearchFormInputs = {
  search: string;
  "full-time"?: "on";
  location: string;
  city: string;
};

export const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement & SearchFormInputs;
    const {
      search,
      "full-time": fullTime,
      location,
      city,
    } = Object.fromEntries(new FormData(target)) as unknown as SearchFormInputs;

    console.log({ search, fullTime, location, city });
  };

  return (
    <section className="search-form-wrapper">
      <form id="search-form" onSubmit={handleSubmit}>
        <Input
          iconStart={<Icon name="work_outline" />}
          placeholder="Title, companies, expertise or benefits"
          name="search"
          required
          fullWidth
        />
        <Button color="primary">Search</Button>
      </form>
    </section>
  );
};
