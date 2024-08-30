import { Icon } from "@hrc/material-icons";
import "./RemainingSearches.scss";

const remainingSearches = "??";

// TODO: implement getRemainingSearches() client service

export function RemainingSearches() {
  return (
    <div className="remaining-searches bold">
      Remaining searches:
      <span className="remaining-searches__count">{remainingSearches}</span>
      <label className="tooltip">
        <input type="checkbox" className="tooltip__checkbox" hidden />
        <span className="tooltip__icon">
          <Icon name="help_outline" />
        </span>
        <span className="tooltip__content">
          {/* This project uses the free tier of{" "} */}
          {/* <a */}
          {/*   href="https://serpapi.com/pricing" */}
          {/*   target="_blank" */}
          {/*   rel="noreferrer" */}
          {/* > */}
          {/*   SerpApi */}
          {/*   <Icon name="open_in_new" /> */}
          {/* </a> */}
          Not implemented yet.
        </span>
      </label>
    </div>
  );
}
