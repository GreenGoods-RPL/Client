import Image from "next/image";
import logo from "@public/icons/GreenGoods_transparent.png"

export default function Home() {
  return (
    <div className="font-montserrat p-10 lg:p-16">
      <header className="w-full h-fit border-2 border-black">
      <div className="flex items-center gap-2 relative h-16 w-16">
        <Image src={logo} alt="Logo" fill sizes="50px" style={{ objectFit: "contain" }} />
      </div>
      </header>
      <main className="">
        Hello World
      </main>
      <footer className="">
        
      </footer>
    </div>
  );
}
