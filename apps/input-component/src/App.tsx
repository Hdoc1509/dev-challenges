import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { InputVariant } from "./components/InputVariant";
import "./App.css";

function App() {
  return (
    <>
      <Header title="Inputs" />
      <InputVariant legend="<Input />">
        <input type="text" placeholder="Placeholder"/>
      </InputVariant>
      <Footer />
    </>
  );
}

export default App;
