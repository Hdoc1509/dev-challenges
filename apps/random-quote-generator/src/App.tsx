import { useEffect, useState } from "react";
import { Footer } from "@internal/components";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { Button } from "@hdoc/react-button";
import { getRandomQuote } from "./services/quotes";
import type { Quote } from "./schemas/quotes";
import "./App.css";

function App() {
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    const getQuote = async () => {
      const quote = await getRandomQuote();
      setQuote(quote);
    };

    void getQuote();
  }, []);

  return (
    <>
      <header className="main-header">
        <Button text="random" iconEnd="autorenew" disableShadow />
        <ThemeButton
          lightElement={<Icon name="light_mode" />}
          darkElement={<Icon name="dark_mode" />}
          fullRounded
        />
      </header>
      <main>
        {quote && (
          <blockquote>
            <p>{quote.text}</p>
            <cite>{quote.author}</cite>
          </blockquote>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
