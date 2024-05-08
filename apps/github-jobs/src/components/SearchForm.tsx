// import { getJobs } from "../services/jobs";
import { getJobs } from "../services/jobs-mock";
import { useJobsStore } from "../store/jobs";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import "./SearchForm.scss";

type FormFields = {
  search: string;
  "full-time"?: "on";
  /** it can be an empty string */
  location: string;
  city?: string;
};

export const SearchForm = () => {
  const setJobs = useJobsStore((s) => s.setJobs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const {
      search,
      "full-time": fullTime,
      location,
      city,
    } = Object.fromEntries(new FormData(target)) as FormFields;

    console.log({ search, fullTime, location, city });

    void getJobs(search).then(([error, jobs]) => {
      if (error) {
        console.error(error);
        return;
      }

      setJobs(jobs);
    });
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
