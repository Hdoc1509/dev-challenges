import { Footer, HeaderWithTheme as Header } from "@internal/components";
import { Nav } from "./components/Nav";
import { TodoList } from "./components/TodoList";
import { todos } from "./data"
import "./App.css";

function App() {
  return (
    <>
      <Header title="#todo" nav={<Nav />} />
      <main>
        <TodoList todos={todos} />
      </main>
      <Footer />
    </>
  );
}

export default App;
