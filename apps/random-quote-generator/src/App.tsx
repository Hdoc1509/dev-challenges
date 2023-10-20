import { Footer } from "@internal/components";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { Button } from "@hdoc/react-button";
import "./App.css";

function App() {
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
      <main>content</main>
      <Footer />
    </>
  );
}

export default App;
