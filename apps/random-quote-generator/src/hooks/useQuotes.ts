import { useCallback, useState } from "react";
import { getAuthorQuotes, getRandomQuote } from "../services/quotes";
import { parseError } from "../utils/error";
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
      .catch((error) => setError(parseError(error)))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAuthorQuotes = useCallback((author: string) => {
    setIsLoading(true);
    setQuotes([]);
    setError(null);

    getAuthorQuotes(author)
      .then((newQuotes) => {
        setQuotes(newQuotes.length > 1 ? newQuotes : [newQuotes[0]]);
      })
      .catch((error) => setError(parseError(error)))
      .finally(() => {
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
