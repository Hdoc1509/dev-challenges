import { Icon } from "@hdoc/react-material-icons";
import type { Quote } from "../schemas/quotes";
import "./BlockQuote.scss";

type Props = {
  quote: Quote;
  withFooter?: boolean;
};

export const BlockQuote = ({ quote, withFooter }: Props) => {
  return (
    <blockquote className="quote">
      <p>{quote.text}</p>
      {withFooter && (
        <footer>
          <button className="quote-credits">
            <span className="quote-credits__author">{quote.author}</span>
            <span className="quote-credits__genre">{quote.genre}</span>
            <Icon
              className="quote-credits__arrow"
              name="arrow_right_alt"
              size="large"
            />
          </button>
        </footer>
      )}
    </blockquote>
  );
};
