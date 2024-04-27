import { useCallback, useEffect, useState } from "react";
import { useQuotes } from "./hooks/useQuotes";
import { ThemeButton } from "@hrc/toggle-theme";
import { Icon } from "@hrc/material-icons";
import { Button } from "@hrc/button";
import { Footer } from "@internal/components/src/Footer";
import { BlockQuote } from "./components/BlockQuote";
import { LoaderRing } from "./components/LoaderRing";
import { ErrorMessage } from "./components/ErrorMessage";
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
          className="main-header__random-button"
          iconEnd={<Icon name="autorenew" />}
          onClick={handleRandomQuote}
          disableShadow
        >
          random
        </Button>
        <ThemeButton
          lightElement={<Icon name="light_mode" color="warning" />}
          darkElement={<Icon name="dark_mode" />}
          fullRounded
        />
      </header>
      <main className="content">
        {isLoading && <LoaderRing />}
        {error && <ErrorMessage message={error.message} />}
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
