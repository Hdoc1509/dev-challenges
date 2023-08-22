import "./App.css";
import { Icon } from "../lib/main";
import { useState } from "react";

function App() {
  const [error, setError] = useState(false);

  const toggleError = () => setError(!error)

  return (
    <>
      <button onClick={toggleError}>toggle error</button>
      <Icon
        name="shopping_cart"
        variant="outlined"
        size="large"
        color="success"
        disabled={error}
      />
    </>
  );
}

export default App;
