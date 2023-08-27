import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Input } from "../lib/Input";
import { InputVariant } from "./components/InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
      <main className="inputs-container">
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
      </main>
      <Footer />
    </>
  );
}

export default App;
