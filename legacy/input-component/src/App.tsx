import { Footer, HeaderWithTheme as Header } from "@lib/components";
import { Input } from "../lib/Input";
import { InputVariant } from "./InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
      <main>
        <div className="inputs-grid">
          <InputVariant legend="Default">
            <Input />
          </InputVariant>
          <InputVariant legend="Error">
            <Input error />
          </InputVariant>
          <InputVariant legend="Disabled">
            <Input disabled />
          </InputVariant>
          <InputVariant legend="Helper text">
            <Input helperText="Some interesting text" />
          </InputVariant>
          <InputVariant legend="Helper text with error">
            <Input helperText="Some interesting text" error />
          </InputVariant>
          <InputVariant legend="Start icon">
            <Input startIcon="phone" />
          </InputVariant>
          <InputVariant legend="End icon">
            <Input endIcon="lock" />
          </InputVariant>
          <InputVariant legend="With value">
            <Input value="Text" />
          </InputVariant>
          <InputVariant legend="Small size">
            <Input size="sm" />
          </InputVariant>
          <InputVariant legend="Medium size (Normal)">
            <Input size="md" />
          </InputVariant>
        </div>
        <InputVariant legend="Full width">
          <Input fullWidth />
        </InputVariant>
        <InputVariant legend="Multiline with 4 rows">
          <Input multiline rows={4} />
        </InputVariant>
      </main>
      <Footer />
    </>
  );
}

export default App;
