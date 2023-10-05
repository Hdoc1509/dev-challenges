import { Icon } from "@hdoc/react-material-icons";
import "./StayCard.scss";

export function StayCard() {
  return (
    <div className="stay-card">
      <img
        className="stay-card__image"
        src="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80"
        alt=""
      />
      <div className="stay-card__features">
        <span className="stay-card__super-host">SUPER HOST</span>
        <span className="stay-card__type">Entire apartment. 2 beds</span>
        <span className="stay-card__rating">
          <Icon name="star" variant="round" size="small" />
          4.40
        </span>
      </div>
      <p className="stay-card__description">
        Stylist apartment in center of the city
      </p>
    </div>
  );
}
