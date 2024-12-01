import Image from "next/image";
import signup from "@public/images/signup.png";
import logo from "@public/icons/GreenGoods_transparent.png"; 

export default function SignupPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      {/* Top Logo */}
      <div className="absolute top-4 left-4">
        <a href="/">
          <Image src={logo} alt="Logo" width={50} height={50} className="cursor-pointer" />
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center shadow-lg rounded-3xl bg-neutral">
        {/* Left Image */}
        <div className="hidden lg:block">
          <Image src={signup} alt="Signup Illustration" width={400} height={400} />
        </div>

        {/* Right Signup Form */}
        <div className="p-8 w-full lg:w-[450px] rounded-tr-lg rounded-br-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

          {/* Signup Form */}
          <form className="space-y-6">
            {/* Username and Email (Side by Side on Large Screens) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* Email */}
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
            </div>

            {/* Password and Confirm Password (Side by Side on Large Screens) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Password */}
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
