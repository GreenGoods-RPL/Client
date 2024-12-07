import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section>{children}</section>
      <Footer />
    </>
  );
}
