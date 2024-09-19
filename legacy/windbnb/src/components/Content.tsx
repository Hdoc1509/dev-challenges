import { useStaysFetchingSelector } from "@/store/stays";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./Results";
import { STATUS } from "@lib/fetcher";
import "./Content.scss";

export function Content() {
  const { status, error, stays } = useStaysFetchingSelector();

  return (
    <main data-loading={status === STATUS.LOADING}>
      {status === STATUS.LOADING && <RingSpinner />}
      {status === STATUS.ERROR && <p>{error.message}</p>}
      {status === STATUS.SUCCESS && <SearchResults results={stays} />}
    </main>
  );
}
