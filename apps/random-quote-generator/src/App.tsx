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
          <blockquote className="quote">
            <p>{quote.text}</p>
            <footer>
              <button className="quote-credits">
                <span className="quote-credits__author">{quote.author}</span>
                <span className="quote-credits__genre">{quote.genre}</span>
                <Icon
                  className="quote-credits__arrow"
                  name="arrow_right_alt"
                  size="large"
                />
              </button>
            </footer>
          </blockquote>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
