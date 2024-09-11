import { useStays } from "@/hooks/useStays.ts";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./Results";
import "./Content.scss";

export function Content() {
  const { stays, error, isLoading, isError, isSuccess } = useStays();

  return (
    <main data-loading={isLoading}>
      {isLoading && <RingSpinner />}
      {isError && <p>{error?.message}</p>}
      {isSuccess && <SearchResults results={stays} />}
    </main>
  );
}
