import { Footer } from "@lib/components/Footer";
import { Header } from "../components/Header";
import "./Layout.scss";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
