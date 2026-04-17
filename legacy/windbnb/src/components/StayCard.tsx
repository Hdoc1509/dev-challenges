import { Icon } from "@hrc/material-icons";
import type { Stay } from "@/types";
import "./StayCard.scss";

export function StayCard({ stay }: { stay: Stay }) {
  const { imageUrl, isSuperHost, type, rating, title, beds } = stay;

  return (
    <li className="stay-card">
      <picture className="stay-card__image">
        <img src={imageUrl} alt={title} title={title} />
      </picture>
      <div className="stay-card__features">
        {isSuperHost && (
          <span className="stay-card__super-host">SUPER HOST</span>
        )}
        <span className="stay-card__type">
          {`${type}.`}{beds && ` ${beds} beds`}
        </span>
        <span className="stay-card__rating" aria-label={`${rating} stars`}>
          <Icon name="star" color="error" variant="round" />
          {rating}
        </span>
      </div>
      <p className="stay-card__description">{title}</p>
    </li>
  );
}
