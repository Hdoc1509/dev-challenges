import { useCallback, useEffect, useState } from "react";
import { Footer } from "@internal/components";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { Button } from "@hdoc/react-button";
import { BlockQuote } from "./components/BlockQuote";
import { useQuotes } from "./hooks/useQuotes";
import { LoaderRing } from "./components/LoaderRing";
import "./App.scss";

function App() {
  const { isLoading, quotes, error, getRandomQuote, getAuthorQuotes } =
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
      <header className="main-header">
        <Button
          text="random"
          iconEnd="autorenew"
          onClick={handleRandomQuote}
          disableShadow
        />
        <ThemeButton
          lightElement={<Icon name="light_mode" />}
          darkElement={<Icon name="dark_mode" />}
          fullRounded
        />
      </header>
      <main className="content">
        {isLoading && <LoaderRing />}
        {error && <p>Error: {error.message}</p>}
        {showAuthorQuotes && (
          <h2 className="quotes-author">{quotes[0]?.author}</h2>
        )}
        {quotes?.map((quote) => (
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
