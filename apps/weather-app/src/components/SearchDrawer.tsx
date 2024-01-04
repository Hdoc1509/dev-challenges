import { useRef, useState } from "react";
import { clsx } from "clsx";
import { getLocations } from "../services/location";
import { Button } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import { SearchResults } from "./SearchResults";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<string[]>([]);
  const lastSearch = useRef("");

  const className = clsx("search-drawer", {
    "search-drawer--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      location: { value: string };
    };
    const search = target.location.value;

    if (search === lastSearch.current) return;

    lastSearch.current = search;
    // TODO: Use city API from https://api-ninjas.com/api/city
    void getLocations(search).then((locations) => setResults(locations));
  };

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <form className="search-drawer__form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Icon name="search" />
          <input name="location" placeholder="search location" required />
        </div>
        <Button text="Search" color="primary" />
      </form>
      <SearchResults results={results} />
    </div>
  );
};
