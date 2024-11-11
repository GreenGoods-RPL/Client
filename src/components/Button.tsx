import Link from "next/link";

export default function Button({ link, text }: { link: string, text: string }) {
  return (
    <Link href={link}>
      <button className="w-[215px] py-2 font-montserrat text-light font-semibold bg-primary border-[5px] border-light rounded-full hover:scale-105">
        { text }
      </button>
    </Link>
  );
}
