import { useCallback, useState } from "react";
import { getAuthorQuotes, getRandomQuote } from "@/services/quotes";
import type { Status } from "@lib/fetcher";
import type { Quote } from "@/types";

export const useQuotes = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleRandomQuote = useCallback(async () => {
    setStatus("loading");

    const [error, quote] = await getRandomQuote();

    if (error) {
      setError(error);
      setStatus("error");
      return;
    }

    setQuotes([quote]);
    setStatus("success");
  }, []);

  const handleAuthorQuotes = useCallback(async (author: string) => {
    setStatus("loading");

    const [error, newQuotes] = await getAuthorQuotes(author);

    if (error) {
      setError(error);
      setStatus("error");
      return;
    }

    setQuotes(newQuotes.length > 1 ? newQuotes : [newQuotes[0]]);
    setStatus("success");
  }, []);

  return {
    status,
    error,
    quotes,
    getRandomQuote: handleRandomQuote,
    getAuthorQuotes: handleAuthorQuotes,
    setQuotes,
  };
};
