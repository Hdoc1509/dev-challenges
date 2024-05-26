import { Button } from "@hrc/button/dist/Button";
import { Input } from "@hrc/input/dist/Input";
import { Icon } from "@hrc/material-icons";
import './SearchForm.scss';

type Props = {
  search: string;
  setSearch: (search: string) => void;
  disabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchForm = ({
  search,
  setSearch,
  disabled,
  handleSubmit,
}: Props) => {
  return (
    <form className="search-drawer__form" onSubmit={handleSubmit}>
      <Input
        iconStart={<Icon name="search" />}
        placeholder="search location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        required
        disabled={disabled}
      />
      <Button color="primary" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
