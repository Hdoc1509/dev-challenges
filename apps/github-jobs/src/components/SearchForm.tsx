import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
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
    <section className="search-form">
      <form
        id="search-form"
        className="search-form__inner"
        onSubmit={handleSubmit}
      >
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
