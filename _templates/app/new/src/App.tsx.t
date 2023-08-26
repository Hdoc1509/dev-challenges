---
to: apps/<%= name %>/src/App.tsx
---

import { Footer, HeaderWithTheme as Header } from "@internal/components";
import "./App.css";

function App() {
  return (
    <>
      <Header title="<%= h.changeCase.title(name) %>" />
      <main>
        content
      </main>
      <Footer />
    </>
  );
}

export default App;
