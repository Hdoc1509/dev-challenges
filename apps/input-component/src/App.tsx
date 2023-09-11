import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Input } from "../lib/Input";
import { InputVariant } from "./components/InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
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
        <InputVariant legend="Small size">
          <Input size="md" />
        </InputVariant>
      </div>
      <Footer />
    </>
  );
}

export default App;
