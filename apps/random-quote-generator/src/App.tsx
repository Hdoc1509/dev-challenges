import { useEffect, useState } from "react";
import { Footer } from "@internal/components";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { Button } from "@hdoc/react-button";
import { BlockQuote } from "./components/BlockQuote";
import { getRandomQuote } from "./services/quotes";
import type { Quote } from "./schemas/quotes";
import "./App.css";

function App() {
  // TODO: Add hook useQuote() with props: quote, getQuote, isLoading
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    void getRandomQuote().then(setQuote);
  }, []);

  return (
    <>
      <header className="main-header">
        <Button
          text="random"
          iconEnd="autorenew"
          onClick={() => {
            void getRandomQuote().then(setQuote);
          }}
          disableShadow
        />
        <ThemeButton
          lightElement={<Icon name="light_mode" />}
          darkElement={<Icon name="dark_mode" />}
          fullRounded
        />
      </header>
      <main className="content">{quote && <BlockQuote quote={quote} withFooter />}</main>
      <Footer />
    </>
  );
}

export default App;
