import { useEffect, useState } from "react";
import { Footer } from "@internal/components";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { Button } from "@hdoc/react-button";
import { BlockQuote } from "./components/BlockQuote";
import { getAuthorQuotes, getRandomQuote } from "./services/quotes";
import type { Quote } from "./schemas/quotes";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

  const handleRandomQuote = () => {
    setIsLoading(true);
    setQuotes([]);
    void getRandomQuote().then((quote) => {
      setQuotes([quote]);
      setIsLoading(false);
      setShowAuthorQuotes(false);
    });
  };
  const handleAuthorQuotes = (author: string) => {
    setIsLoading(true);
    setQuotes([]);
    void getAuthorQuotes(author, 2).then((newQuotes) => {
      setQuotes([...quotes, ...newQuotes]);
      setIsLoading(false);
      setShowAuthorQuotes(true);
    });
  };

  useEffect(() => handleRandomQuote(), []);

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
        {isLoading && <p>loading...</p>}
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
