import { useCallback, useEffect, useState } from "react";
import { getAuthorQuotes, getRandomQuote } from "@/services/quotes/client";
import { STATUS, type Status } from "@lib/fetcher";
import type { Quote } from "@/types";

export const useQuotes = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthorQuotes, setIsAuthorQuotes] = useState(false);

  const handleRandomQuote = useCallback(async () => {
    setStatus(STATUS.LOADING);

    const [error, quote] = await getRandomQuote();

    if (error) {
      setError(error);
      setStatus(STATUS.ERROR);
      return;
    }

    setQuotes([quote]);
    setIsAuthorQuotes(false);
    setStatus(STATUS.SUCCESS);
  }, []);

  const handleAuthorQuotes = useCallback(async (author: string) => {
    setStatus(STATUS.LOADING);

    const [error, newQuotes] = await getAuthorQuotes(author);

    if (error) {
      setError(error);
      setStatus(STATUS.ERROR);
      return;
    }

    setQuotes(newQuotes);
    setIsAuthorQuotes(true);
    setStatus(STATUS.SUCCESS);
  }, []);

  useEffect(() => void handleRandomQuote(), [handleRandomQuote]);

  return {
    quotes,
    error,
    isLoading: status === STATUS.LOADING,
    isError: status === STATUS.ERROR,
    isSuccess: status === STATUS.SUCCESS,
    isAuthorQuotes,
    getRandomQuote: handleRandomQuote,
    getAuthorQuotes: handleAuthorQuotes,
  };
};
