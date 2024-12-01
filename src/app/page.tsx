import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopSellingProducts from "@/components/TopSelling";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-montserrat px-10 lg:px-16">
        <main>
          <Hero />
          <TopSellingProducts />
        </main>
      </div>
      <Footer />
    </>
  );
}
