import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import duck from "@public/images/duck.jpg";

export default function ProductCard({
  id,
  image,
  title,
  rating,
  price,
}: {
  id: string | number;
  image: StaticImageData;
  title: string;
  rating: number;
  price: number;
}) {
  return (
    <Link href={`/product/${id}`} passHref>
      <div className="cursor-pointer min-h-[400px] min-w-[280px] bg-[#F0EEED] shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
        <Image
          src={duck}
          alt={"boilerplate image"}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-xl text-primary">{title}</h2>
          <div className="flex items-center my-2">
            <span className="text-yellow-400 text-xl">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </span>
            <span className="text-gray-600 ml-2">({rating})</span>
          </div>
          <p className="text-primary text-lg">Rp{price}</p>
        </div>
      </div>
    </Link>
  );
}
