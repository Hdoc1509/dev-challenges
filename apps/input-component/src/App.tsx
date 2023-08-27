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
      </main>
      <Footer />
    </>
  );
}

export default App;
