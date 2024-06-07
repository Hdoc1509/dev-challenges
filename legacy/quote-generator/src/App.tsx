import { useCallback, useEffect, useState } from "react";
import { useQuotes } from "./hooks/useQuotes";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { Header } from "./components/Header";
import { Footer } from "@internal/components/src/Footer";
import { BlockQuote } from "./components/BlockQuote";
import { ErrorMessage } from "./components/ErrorMessage";
import "./App.scss";

function App() {
  const { quotes, error, status, getRandomQuote, getAuthorQuotes } =
    useQuotes();
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

  const handleRandomQuote = useCallback(() => {
    getRandomQuote();
    setShowAuthorQuotes(false);
  }, [getRandomQuote]);
  const handleAuthorQuotes = (author: string) => {
    getAuthorQuotes(author);
    setShowAuthorQuotes(true);
  };

  useEffect(() => handleRandomQuote(), [handleRandomQuote]);

  return (
    <>
      <Header
        isLoading={status === "loading"}
        handleRandomQuote={handleRandomQuote}
      />
      <main className="content">
        {status === "loading" && <RingSpinner />}
        {status === "error" && <ErrorMessage message={error!.message} />}
        {status === "success" && showAuthorQuotes && (
          <h2 className="quotes-author">{quotes[0].author}</h2>
        )}
        {status === "success" &&
          quotes.map((quote) => (
            <BlockQuote
              key={quote.id}
              quote={quote}
              onClick={() => handleAuthorQuotes(quote.author)}
              withFooter={!showAuthorQuotes}
            />
          ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
