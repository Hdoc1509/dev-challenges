import { useSearchDrawerStore } from "@/store/search-drawer";
import { useSearchFetchingSelector } from "@/store/search";
import { clsx } from "clsx";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { STATUS } from "@lib/fetcher";
import "./SearchDrawer.scss";

export const SearchDrawer = () => {
  const { status, error, results } = useSearchFetchingSelector();
  const isOpen = useSearchDrawerStore((s) => s.isOpen);
  const closeDrawer = useSearchDrawerStore((s) => s.closeDrawer);

  const className = clsx("search-drawer", { open: isOpen });

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={closeDrawer}>
        <Icon name="close" />
      </div>
      <SearchForm disabled={!isOpen} />
      {status === STATUS.LOADING && <RingSpinner />}
      {status === STATUS.ERROR && <p>{error.message}</p>}
      {status === STATUS.SUCCESS && (
        <SearchResults results={results} disabled={!isOpen} />
      )}
    </div>
  );
};
