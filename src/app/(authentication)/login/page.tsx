import Image from "next/image";
import login from "@public/images/login.png";
import logo from "@public/icons/GreenGoods_transparent.png"; // Assuming a logo image exists

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      {/* Top Logo */}
      <div className="absolute top-4 left-4">
        <a href="/">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center shadow-lg rounded-3xl bg-neutral border-2">
        {/* Left Image */}
        <div className="hidden lg:block border-">
          <Image
            src={login}
            alt="Login Illustration"
            width={400}
            height={400}
          />
        </div>

        {/* Right Login Form */}
        <div className="p-8 w-full lg:w-[450px]">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>

          {/* Login Form */}
          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                Login
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
