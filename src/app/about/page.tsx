import AboutHeroSection from "@/components/AboutHeroSection";
import AboutFutureSection from "@/components/AboutFutureSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AboutHeroSection />
          <AboutFutureSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
