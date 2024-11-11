import React from "react";
import Image from "next/image";
import Button from "./Button";
import hero from "@public/images/Floating island 1.png";

export default function Hero() {
  return (
    <section className="py-12 px-28 bg-secondary rounded-3xl flex justify-between">
      <div className="flex flex-col justify-center">
        <p
          className="mb-10 font-yanone font-bold text-[122px] text-light"
          style={{ lineHeight: "1" }}
        >
          Live <br /> Healthy,
          <br /> Earth Happy
        </p>
        <Button link="/about" text="Learn More" />
      </div>
      <Image
        src={hero}
        alt="Hero"
        width={500}
        height={500}
        style={{ objectFit: "cover" }}
      />
    </section>
  );
}
