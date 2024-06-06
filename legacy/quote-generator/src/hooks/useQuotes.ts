import { useCallback, useState } from "react";
import { getAuthorQuotes, getRandomQuote } from "../services/quotes";
import { parseError } from "../utils/error";
import type { Quote } from "../types";

type Status = "idle" | "loading" | "error" | "success";

export const useQuotes = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleRandomQuote = useCallback(() => {
    setStatus("loading");

    getRandomQuote()
      .then((quote) => {
        setQuotes([quote]);
        setStatus("success");
      })
      .catch((error) => {
        setError(parseError(error));
        setStatus("error");
      });
  }, []);

  const handleAuthorQuotes = useCallback((author: string) => {
    setStatus("loading");

    getAuthorQuotes(author)
      .then((newQuotes) => {
        setQuotes(newQuotes.length > 1 ? newQuotes : [newQuotes[0]]);
        setStatus("success");
      })
      .catch((error) => {
        setError(parseError(error));
        setStatus("error");
      });
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
