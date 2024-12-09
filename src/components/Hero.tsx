import React from "react";
import Image from "next/image";
import Button from "./Button";
import hero from "@public/images/Floating island 1.png";

export default function Hero() {
  return (
    <section className="py-12 lg:px-28 sm:px-16 px-5 bg-secondary rounded-3xl flex sm:justify-between items-center sm:flex-row flex-col-reverse">
      <div className="flex flex-col justify-center">
        <p
          className="mb-10 font-yanone font-bold lg:text-[110px] text-5xl text-light"
          style={{ lineHeight: "1" }}
        >
          Live <br /> Healthy,
          <br /> Earth Happy
        </p>
        <Button link="/about" text="Learn More" />
      </div>
      <div className="lg:w-[500px] sm:w-[300px] w-[240px]">
      <Image
        src={hero}
        alt="Hero"
        width={500}
        height={500}
        style={{ objectFit: "cover" }}
      />
      </div>
    </section>
  );
}
