import Button from "@/components/Button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import duck from "@public/images/duck.jpeg";

const products = [
  {
    id: 1,
    image: duck,
    title: "Product 1",
    rating: 4.5,
    price: 29.99,
  },
  {
    id: 2,
    image: duck,
    title: "Product 2",
    rating: 3.8,
    price: 19.99,
  },
  {
    id: 3,
    image: duck,
    title: "Product 3",
    rating: 4.2,
    price: 39.99,
  },
  {
    id: 4,
    image: duck,
    title: "Product 4",
    rating: 5.0,
    price: 49.99,
  },
];

export default function Home() {
  return (
    <div className="font-montserrat p-10 lg:p-16">
      <Header />
      <main className="">
        <Hero />
        <section className="py-8">
          <div className="container flex flex-col items-center justify-center">
            <h1 className="font-yanone font-bolx text-5xl font-bold text-primary mb-6">
              TOP SELLING
            </h1>
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
            </div>
            <Button link="/" text="More" />
          </div>
        </section>
      </main>
      <footer className=""></footer>
    </div>
  );
}
