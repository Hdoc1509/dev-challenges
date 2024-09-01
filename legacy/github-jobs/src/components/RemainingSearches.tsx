import { useEffect } from "react";
import { useRemainingSearches } from "@/hooks/useRemainingSearches";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { Tooltip } from "./Tooltip";
import "./RemainingSearches.scss";

let didInit = false;

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
  const {
    remainingSearches,
    error,
    isError,
    isLoading,
    isSuccess,
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
        {isLoading && <RingSpinner />}
        {isError && "??"}
        {isSuccess && remainingSearches}
      </span>
      <Tooltip
        content={<TooltipContent />}
        trigger={<Icon name="help_outline" />}
      />
      {isError && (
        <span className="remaining-searches__error">{error?.message}</span>
      )}
    </div>
  );
}
