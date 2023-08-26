import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Input } from "./components/Input";
import { InputVariant } from "./components/InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
      <main className="inputs-container">
        <InputVariant legend="<Input />">
          <Input label="Label" placeholder="Placeholder" />
        </InputVariant>
      </main>
      <Footer />
    </>
  );
}

export default App;
