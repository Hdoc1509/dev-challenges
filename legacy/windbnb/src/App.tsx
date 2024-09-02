import { useStays } from "./hooks/useStays.ts";
import { Layout } from "./layouts/Layout.tsx";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./components/Results";
import "./App.css";

function App() {
  const { stays, error, isLoading, isError, isSuccess } = useStays();

  return (
    <Layout>
      <main data-loading={isLoading}>
        {isLoading && <RingSpinner />}
        {isError && <p>{error?.message}</p>}
        {isSuccess && <SearchResults results={stays} />}
      </main>
    </Layout>
  );
}

export default App;
