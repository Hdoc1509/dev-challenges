import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Input } from "../lib/Input";
import { InputVariant } from "./components/InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
      <main className="inputs-container">
        <InputVariant legend="<Input />">
          <Input />
        </InputVariant>
        <InputVariant legend='<Input error />'>
          <Input error />
        </InputVariant>
        <InputVariant legend='<Input disabled />'>
          <Input disabled />
        </InputVariant>
        <InputVariant legend='<Input helperText="Some interesting text" />'>
          <Input helperText="Some interesting text" />
        </InputVariant>
        <InputVariant legend='<Input helperText="Some interesting text" error />'>
          <Input helperText="Some interesting text" error />
        </InputVariant>
      </main>
      <Footer />
    </>
  );
}

export default App;
