import { useCallback, useEffect, useState } from "react";
import { getRemainingSearches } from "@/services/remaining-searches/client";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import type { Status } from "@lib/fetcher";
import "./RemainingSearches.scss";

let didInit = false;

export function RemainingSearches() {
  const [remainingSearches, setRemainingSearches] = useState<null | number>(
    null,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<null | Error>(null);

  const getInitialRemainingSearches = useCallback(async () => {
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const [error, result] = await getRemainingSearches();

    if (error != null) {
      setError(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setRemainingSearches(result);
  }, []);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getInitialRemainingSearches();
    }
  }, [getInitialRemainingSearches]);

  return (
    <div className="remaining-searches bold">
      Remaining searches:
      <span className="remaining-searches__count">
        {status === "loading" && <RingSpinner />}
        {status === "error" && "??"}
        {status === "success" && remainingSearches}
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
      {status === "error" && (
        <span className="remaining-searches__error">{error?.message}</span>
      )}
    </div>
  );
}
