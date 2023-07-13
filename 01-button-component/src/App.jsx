import "./App.scss";
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
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Outline">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Text">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Disable shadow">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Disabled">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Text disabled">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Start icon">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="End icon">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Small (sm)">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Medium (md)">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Large (lg)">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Color default">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Color primary">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Color secondary">
            <button>Default</button>
          </ButtonVariant>
          <ButtonVariant name="Color danger">
            <button>Default</button>
          </ButtonVariant>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
