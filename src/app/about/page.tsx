import AboutHeroSection from "@/components/AboutHeroSection"
import Image from 'next/image'
import collaboration from '@public/images/collaboration.png'
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
        <main className={"container mx-auto px-4 lg:px-8 py-8 flex flex-col gap-12"}>
          <div className="flex items-center">
            <div className="flex items-start justify-center w-1/2 h-96 overflow-hidden rounded-xl">
              <Image src={collaboration} alt="People collaborating" layout="responsive" width={100} height={100} className="object-cover" />
            </div>
            <div className="w-2/3 px-10 flex flex-col">
              <h3 className="font-montserrat font-semibold text-3xl mb-8 text-primary">About Us</h3>
              <p className="font-montserrat">
                In recent years, environmental and sustainability issues have gained global attention due to the harmful effects of waste, energy consumption, and non-renewable resource use. Despite growing awareness, society still struggles to adopt eco-friendly solutions. Excessive waste, especially from harmful materials, continues to negatively impact the environment.
                <br />
                <br />
                GreenGoods an e-commerce to purchase eco-friendly products. We provide customers with information about each product&apos;s certification and green scoring to make informed decisions about which eco-friendly products to buy.
              </p>
            </div>
          </div>
          <AboutHeroSection />
        </main>
      <Footer />
    </>
  );
}
