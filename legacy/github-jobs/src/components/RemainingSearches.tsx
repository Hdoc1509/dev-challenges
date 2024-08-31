import { useEffect } from "react";
import { useRemainingSearches } from "@/hooks/useRemainingSearches";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { STATUS } from "@lib/fetcher";
import "./RemainingSearches.scss";

let didInit = false;

export function RemainingSearches() {
  const {
    remainingSearches,
    remainingSearchesStatus,
    remainingSearchesError,
    getRemainingSearches,
  } = useRemainingSearches();

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getRemainingSearches();
    }
  }, [getRemainingSearches]);

  return (
    <div className="remaining-searches bold">
      Remaining searches:
      <span className="remaining-searches__count">
        {remainingSearchesStatus === STATUS.LOADING && <RingSpinner />}
        {remainingSearchesStatus === STATUS.ERROR && "??"}
        {remainingSearchesStatus === STATUS.SUCCESS && remainingSearches}
      </span>
      <label className="tooltip">
        <input type="checkbox" className="tooltip__checkbox" hidden />
        <span className="tooltip__icon">
          <Icon name="help_outline" />
        </span>
        <span className="tooltip__content">
          This project uses the free tier of{" "}
          <a
            href="https://serpapi.com/pricing"
            target="_blank"
            rel="noreferrer"
          >
            SerpApi
            <Icon name="open_in_new" />
          </a>
        </span>
      </label>
      {remainingSearchesStatus === STATUS.ERROR && (
        <span className="remaining-searches__error">
          {remainingSearchesError?.message}
        </span>
      )}
    </div>
  );
}
