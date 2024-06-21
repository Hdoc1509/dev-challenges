import { BlockQuote } from "./BlockQuote";
import type { Quote } from "@/types";
import './Results.scss';

type Props = {
  quotes: Quote[];
  showAuthorQuotes: boolean;
  handleAuthorQuotes: (author: string) => void;
};

export const Results = ({
  quotes,
  showAuthorQuotes,
  handleAuthorQuotes,
}: Props) => {
  return (
    <>
      {showAuthorQuotes && (
        <h2 className="quotes-author">{quotes[0].author}</h2>
      )}
      {quotes.map((quote) => (
        <BlockQuote
          key={quote.id}
          quote={quote}
          onClick={() => handleAuthorQuotes(quote.author)}
          withFooter={!showAuthorQuotes}
        />
      ))}
    </>
  );
};
