import { Icon } from "@hrc/material-icons";
import type { Simplify } from "type-fest";
import type { Stay } from "../types";
import "./StayCard.scss";

type Props = {
  stay: Simplify<Omit<Stay, "city" | "country" | "maxGuests">>;
};

export function StayCard({ stay }: Props) {
  const { imageUrl, isSuperHost, type, rating, title, beds } = stay;

  return (
    <div className="stay-card">
      <img
        className="stay-card__image"
        src={imageUrl}
        alt={title}
        title={title}
      />
      <div className="stay-card__features">
        {isSuperHost && (
          <span className="stay-card__super-host">SUPER HOST</span>
        )}
        <span className="stay-card__type">
          {type} {beds && `. ${beds} beds`}
        </span>
        <span className="stay-card__rating">
          <Icon name="star" variant="round" />
          {rating}
        </span>
      </div>
      <p className="stay-card__description">{title}</p>
    </div>
  );
}
