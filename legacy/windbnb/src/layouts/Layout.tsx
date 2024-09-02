import { Header } from "@/components/Header";
import { Footer } from "@lib/components/Footer";
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
