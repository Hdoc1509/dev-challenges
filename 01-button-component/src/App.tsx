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
            <Button disableShadow />
          </ButtonVariant>
          <ButtonVariant name="Disabled">
            <Button disabled />
          </ButtonVariant>
          <ButtonVariant name="Text disabled">
            <Button variant="text" disabled />
          </ButtonVariant>
          <ButtonVariant name="Start icon">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="End icon">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Small (sm)">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Medium (md)">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Large (lg)">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Color default">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Color primary">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Color secondary">
            <Button />
          </ButtonVariant>
          <ButtonVariant name="Color danger">
            <Button />
          </ButtonVariant>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
