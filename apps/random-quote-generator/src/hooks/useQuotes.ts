import { useCallback, useState } from "react";
import { getAuthorQuotes, getRandomQuote } from "../services/quotes";
import type { Quote } from "../schemas/quotes";

export const useQuotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleRandomQuote = useCallback(() => {
    setIsLoading(true);
    setQuotes([]);
    setError(null);

    getRandomQuote()
      .then((quote) => {
        setQuotes([quote]);
      })
      .catch((error) => {
        if (!(error instanceof Error)) {
          setError({ name: "Error", message: "An unknown error occurred" });
          return;
        }

        if (error.name === "AbortError") {
          setError({ name: "Error", message: "Request timed out" });
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAuthorQuotes = useCallback((author: string) => {
    setIsLoading(true);
    setQuotes([]);
    void getAuthorQuotes(author).then((newQuotes) => {
      setQuotes(newQuotes.length > 1 ? newQuotes : [newQuotes[0]]);
      setIsLoading(false);
    });
  }, []);

  return {
    isLoading,
    error,
    quotes,
    getRandomQuote: handleRandomQuote,
    getAuthorQuotes: handleAuthorQuotes,
    setIsLoading,
    setQuotes,
  };
};
