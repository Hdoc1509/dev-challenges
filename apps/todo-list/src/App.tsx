import { Footer, HeaderWithTheme as Header } from "@internal/components";
import "./App.css";

function App() {
  return (
    <>
      <Header
        title="#todo"
        nav={
          <nav style={{ gridArea: "nav" }}>
            <a href="#">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
          </nav>
        }
      />
      <main>
        <div className="todo-container">
          <form className="todo-form">
            <input type="text" />
            <button>Add</button>
          </form>
          <ul className="todo-list">
            <li className="todo-item">
              <input type="checkbox" />
              <span>Do coding challenges</span>
            </li>
            <li className="todo-item">
              <input type="checkbox" />
              <span>Do coding challenges</span>
            </li>
            <li className="todo-item">
              <input type="checkbox" />
              <span>Do coding challenges</span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
