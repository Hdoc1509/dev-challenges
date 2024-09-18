import { useStaysStore } from "@/store/stays";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./Results";
import { STATUS } from "@lib/fetcher";
import "./Content.scss";

export function Content() {
  const stays = useStaysStore((s) => s.stays);
  const status = useStaysStore((s) => s.status);
  const error = useStaysStore((s) => s.error);

  return (
    <main data-loading={status === STATUS.LOADING}>
      {status === STATUS.LOADING && <RingSpinner />}
      {status === STATUS.ERROR && <p>{error?.message}</p>}
      {status === STATUS.SUCCESS && <SearchResults results={stays} />}
    </main>
  );
}
