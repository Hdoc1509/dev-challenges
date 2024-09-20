import { useRemainingSearchesStore } from "@/store/remaining-searches";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { Tooltip } from "./Tooltip";
import { STATUS } from "@lib/fetcher";
import "./RemainingSearches.scss";

function TooltipContent() {
  return (
    <>
      This project uses the free tier of{" "}
      <a href="https://serpapi.com/pricing" target="_blank" rel="noreferrer">
        SerpApi
        <Icon name="open_in_new" />
      </a>
    </>
  );
}

export function RemainingSearches() {
  const status = useRemainingSearchesStore((s) => s.status);
  const error = useRemainingSearchesStore((s) => s.error);
  const remainingSearches = useRemainingSearchesStore(
    (s) => s.remainingSearches,
  );

  return (
    <div className="remaining-searches bold">
      Remaining searches:
      <span className="remaining-searches__count">
        {status === STATUS.LOADING && <RingSpinner />}
        {status === STATUS.ERROR && "??"}
        {status === STATUS.SUCCESS && remainingSearches}
      </span>
      <Tooltip
        content={<TooltipContent />}
        trigger={<Icon name="help_outline" />}
      />
      {status === STATUS.ERROR && (
        <span className="remaining-searches__error">{error?.message}</span>
      )}
    </div>
  );
}
