import { Footer, HeaderWithTheme as Header } from "@lib/components";
import { Nav } from "./components/Nav";
import { Content } from "./components/Content";
import "./App.scss";

function App() {
  return (
    <>
      <Header title="#todo" nav={<Nav />} />
      <Content />
      <Footer />
    </>
  );
}

export default App;
