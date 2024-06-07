import { useCallback, useEffect, useState } from "react";
import { useQuotes } from "./hooks/useQuotes";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { Header } from "./components/Header";
import { Footer } from "@internal/components/src/Footer";
import { ErrorMessage } from "./components/ErrorMessage";
import { Results } from "./components/Results";
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
      <main>
        {status === "loading" && <RingSpinner />}
        {status === "error" && <ErrorMessage message={error!.message} />}
        {status === "success" && (
          <Results
            quotes={quotes}
            showAuthorQuotes={showAuthorQuotes}
            handleAuthorQuotes={handleAuthorQuotes}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
