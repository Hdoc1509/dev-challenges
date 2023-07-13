import "./App.scss";
import { Button } from "./components/Button";
import { ButtonVariant } from "./components/ButtonVariant";

function App() {
  return (
    <>
      <header>
        <h1>Buttons</h1>
      </header>
      <main>
        <div className="buttons-grid">
          <ButtonVariant name="Default">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Outline">
            <Button variant="outline" />
          </ButtonVariant>
          <ButtonVariant name="Text">
            <Button variant="text" />
          </ButtonVariant>
          <ButtonVariant name="Disable shadow">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Disabled">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Text disabled">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Start icon">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="End icon">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Small (sm)">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Medium (md)">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Large (lg)">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Color default">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Color primary">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Color secondary">
            <Button>Default</Button>
          </ButtonVariant>
          <ButtonVariant name="Color danger">
            <Button>Default</Button>
          </ButtonVariant>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
