import { Icon } from "@hdoc/react-material-icons";
import type { Quote } from "../schemas/quotes";
import "./BlockQuote.scss";

type Props = {
  quote: Quote;
  withFooter?: boolean;
  onClick?: () => void;
};

export const BlockQuote = ({ quote, withFooter, onClick }: Props) => {
  return (
    <blockquote className="quote">
      <p>{quote.text}</p>
      {withFooter && (
        <footer>
          <button className="quote-credits" onClick={onClick}>
            <div>
              <span className="quote-credits__author">{quote.author}</span>
              <span className="quote-credits__genre">{quote.genre}</span>
            </div>
            <div>
              <Icon
                className="quote-credits__arrow"
                name="arrow_right_alt"
                size="large"
              />
              <span className="quote-credits__more-quotes">More quotes</span>
            </div>
          </button>
        </footer>
      )}
    </blockquote>
  );
};
