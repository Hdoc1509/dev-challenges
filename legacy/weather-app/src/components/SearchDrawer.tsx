import { useSearchStore } from "@/store/search";
import { clsx } from "clsx";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const status = useSearchStore((s) => s.status);
  const error = useSearchStore((s) => s.error);

  const className = clsx("search-drawer", { open: isOpen });

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <SearchForm disabled={!isOpen} />
      {status === "loading" && <RingSpinner />}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" && <SearchResults onClose={onClose} />}
    </div>
  );
};
