import { useCallback, useEffect, useState } from "react";
import { useQuotes } from "./hooks/useQuotes";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { Header } from "./components/Header";
import { Footer } from "@lib/components/Footer";
import { ErrorMessage } from "./components/ErrorMessage";
import { Results } from "./components/Results";
import "./App.scss";

function App() {
  const {
    quotes,
    error,
    isLoading,
    isError,
    isSuccess,
    getRandomQuote,
    getAuthorQuotes,
  } = useQuotes();
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

  const handleRandomQuote = useCallback(() => {
    void getRandomQuote();
    setShowAuthorQuotes(false);
  }, [getRandomQuote]);
  const handleAuthorQuotes = (author: string) => {
    void getAuthorQuotes(author);
    setShowAuthorQuotes(true);
  };

  useEffect(() => handleRandomQuote(), [handleRandomQuote]);

  return (
    <>
      <Header isLoading={isLoading} handleRandomQuote={handleRandomQuote} />
      <main>
        {isLoading && <RingSpinner />}
        {isError && <ErrorMessage error={error as Error} />}
        {isSuccess && (
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
