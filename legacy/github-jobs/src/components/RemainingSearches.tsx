import { useEffect } from "react";
import { useRemainingSearches } from "@/hooks/useRemainingSearches";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
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
        {remainingSearchesStatus === "loading" && <RingSpinner />}
        {remainingSearchesStatus === "error" && "??"}
        {remainingSearchesStatus === "success" && remainingSearches}
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
      {remainingSearchesStatus === "error" && (
        <span className="remaining-searches__error">
          {remainingSearchesError?.message}
        </span>
      )}
    </div>
  );
}
