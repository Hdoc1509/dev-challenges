import { useSearchDrawerStore } from "@/store/search-drawer";
import { useSearchLocation } from "@/hooks/useSearchLocation";
import { clsx } from "clsx";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import "./SearchDrawer.scss";

export const SearchDrawer = () => {
  const isOpen = useSearchDrawerStore((s) => s.isOpen);
  const closeDrawer = useSearchDrawerStore((s) => s.closeDrawer);
  const { error, isLoading, isError, isSuccess } = useSearchLocation();

  const className = clsx("search-drawer", { open: isOpen });

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={closeDrawer}>
        <Icon name="close" />
      </div>
      <SearchForm disabled={!isOpen} />
      {isLoading && <RingSpinner />}
      {isError && <p>{error?.message}</p>}
      {isSuccess && <SearchResults disabled={!isOpen} onClose={closeDrawer} />}
    </div>
  );
};
