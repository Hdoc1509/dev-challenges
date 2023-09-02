import { Button } from "../lib/Button";
import { ButtonVariant } from "./components/ButtonVariant";
import { Footer, HeaderWithTheme as Header } from "@internal/components";
import "./App.scss";

function App() {
  const buttonIcon = "shopping_cart";

  return (
    <>
      <Header title="Buttons" />
      <main>
        <section className="buttons-grid">
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
            <Button startIcon="add_shopping_cart" />
          </ButtonVariant>
          <ButtonVariant name="End icon">
            <Button endIcon="add_shopping_cart" />
          </ButtonVariant>
          <ButtonVariant name="End icon - outlined">
            <Button endIcon={buttonIcon} iconStyle="outlined" />
          </ButtonVariant>
          <ButtonVariant name="End icon - round">
            <Button endIcon={buttonIcon} iconStyle="round" />
          </ButtonVariant>
          <ButtonVariant name="End icon - sharp">
            <Button endIcon={buttonIcon} iconStyle="sharp" />
          </ButtonVariant>
          <ButtonVariant name="End icon - tow-tone">
            <Button endIcon={buttonIcon} iconStyle="two-tone" />
          </ButtonVariant>
          <ButtonVariant name="Small (sm)">
            <Button size="sm" />
          </ButtonVariant>
          <ButtonVariant name="Medium (md)">
            <Button size="md" />
          </ButtonVariant>
          <ButtonVariant name="Large (lg)">
            <Button size="lg" />
          </ButtonVariant>
          <ButtonVariant name="Color default">
            <Button color="default" />
          </ButtonVariant>
          <ButtonVariant name="Color primary">
            <Button color="primary" />
          </ButtonVariant>
          <ButtonVariant name="Color secondary">
            <Button color="secondary" />
          </ButtonVariant>
          <ButtonVariant name="Color danger">
            <Button color="danger" />
          </ButtonVariant>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
