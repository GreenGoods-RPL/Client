"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getProductById, purchaseProduct } from "@/services/product";
import { getAddresses, getVouchers, redeemVoucher } from "@/services/user";
import Image from "next/image";
import duck from "@public/images/duck.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const productId = use(params).id;
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch product details
        const product = await getProductById(productId);
        setProduct(product);

        // Fetch user addresses
        const userAddresses = await getAddresses(token);
        if(userAddresses.length === 0) {
          alert("You have not added any address yet.\nPlease add an address first.");
        }
        setAddresses(userAddresses);

        // Fetch user vouchers
        const userVouchers = await getVouchers(token);
        if (Array.isArray(userVouchers)) {
          setVouchers(userVouchers);
        } else {
          console.warn("Vouchers response is not an array:", userVouchers);
          setVouchers([]);
        }
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, token]);

  const handlePurchase = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    try {
      await purchaseProduct(productId, quantity, token);
      await redeemVoucher(token, selectedVoucher);
      alert("Your order was placed successfully!");
      router.push("/transactions");
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to complete the purchase. Please try again.");
    }
  };

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
          <button
            className="bg-secondary text-white py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="font-montserrat px-6 lg:px-24 py-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
        <div className="space-y-5">
          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Product Details
            </h2>
            <div className="px-8 py-4 border rounded-lg bg-neutral shadow flex justify-between items-center">
              {/* Product Info */}
              <div className="flex-1">
                <p className="text-xl font-bold mb-5">{product.name}</p>
                <p className="text-gray-600">Price: Rp{product.price}</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
              </div>

              {/* Product Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={duck}
                  alt="Product Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-xl">
            <div className="flex justify-between space-x-10">
              {/* Address Selection */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h2>
                <select
                  className="w-full border border-gray-300 rounded-md py-2 px-4"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  <option value="">Select an address</option>
                  {(addresses.length > 0) && addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {`${address.street}, ${address.city}, ${address.country}`}
                    </option>
                  ))}
                </select>
              </div>
              {/* Voucher Selection */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Apply Voucher
                </h2>
                <div className="mx-10 max-w-xl">
                  {vouchers.length > 0 ? (
                    <Carousel>
                      <CarouselContent>
                        {vouchers.map((voucher) => (
                          <CarouselItem key={voucher.id} className="basis-1/2">
                            <div
                              className={`p-4 border rounded-lg cursor-pointer ${
                                selectedVoucher === voucher.id
                                  ? "border-primary bg-primary-light"
                                  : "border-gray-300"
                              }`}
                              onClick={() => setSelectedVoucher(voucher)}
                            >
                              <p className="text-lg font-bold">
                                {voucher.code}
                              </p>
                              <p className="text-gray-600">
                                {voucher.isRedeemed ? "Redeemed" : "Available"}
                              </p>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <p className="text-gray-600">No vouchers available.</p>
                  )}
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="flex justify-between space-x-4 my-5">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <p>Subtotal: Rp{(product.price * quantity).toFixed(2)}</p>
                {selectedVoucher && (
                  <p>Voucher Discount: -Rp{(product.price * 0.1).toFixed(2)}</p>
                )}
                <p className="font-bold">
                  Total: Rp
                  {(
                    product.price * quantity -
                    (selectedVoucher ? product.price * 0.1 : 0)
                  ).toFixed(2)}
                </p>
              </div>
              {/* Quantity Controls */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Quantity
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-secondary text-white px-3 py-2 rounded"
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="bg-secondary text-white px-3 py-2 rounded"
                    onClick={() => handleQuantityChange("increment")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Place Order */}
            <button
              className={`text-white py-3 px-6 rounded w-full ${
                selectedAddress
                  ? "bg-primary hover:bg-secondary"
                  : "bg-gray-400"
              }`}
              onClick={handlePurchase}
              disabled={!selectedAddress}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
