import "./App.css";
import { Icon } from "../lib/main";
import { useState } from "react";

function App() {
  const [error, setError] = useState(false);

  const toggleError = () => setError(!error);

  return (
    <>
      <button onClick={toggleError}>toggle error</button>
      <div className="icon-container">
        <Icon name="error" variant="outlined" size="large" />
      </div>
      <div className="my-container-with-custom-color">
        <Icon
          name="shopping_cart"
          variant="outlined"
          size="large"
          color="error"
          disabled={error}
        />
      </div>
    </>
  );
}

export default App;
