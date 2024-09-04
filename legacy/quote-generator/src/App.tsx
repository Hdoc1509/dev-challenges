import { useQuotes } from "./hooks/useQuotes";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { Header } from "./components/Header";
import { Footer } from "@lib/components/Footer";
import { ErrorMessage } from "./components/ErrorMessage";
import { Results } from "./components/Results";

function App() {
  const {
    quotes,
    error,
    isLoading,
    isError,
    isSuccess,
    isAuthorQuotes,
    getRandomQuote,
    getAuthorQuotes,
  } = useQuotes();

  return (
    <>
      <Header isLoading={isLoading} handleRandomQuote={getRandomQuote} />
      <main>
        {isLoading && <RingSpinner />}
        {isError && <ErrorMessage error={error as Error} />}
        {isSuccess && (
          <Results
            quotes={quotes}
            showAuthorQuotes={isAuthorQuotes}
            handleAuthorQuotes={getAuthorQuotes}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
