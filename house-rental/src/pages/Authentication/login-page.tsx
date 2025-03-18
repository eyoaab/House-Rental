import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="scrollbar-hidden min-h-screen w-screen flex items-center justify-center bg-white px-6 overflow-x-hidden mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto h-[70%]">
        <div className="grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="hidden lg:block relative">
            <img
              src="/register.jpeg"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-end p-8">
              <h2 className="text-primary text-3xl font-bold">Welcome Back!</h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12">
            {/* Title and Description */}
            <p className="text-sm md:text-lg font-bold text-gray-800 mb-2">
              Login to Your Account
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Enter your credentials to access your account.
            </p>

            {/* Form Fields */}
            <form className="space-y-5 text-secondary">
              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-secondary text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-secondary text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <div className="cursor-pointer w-max bg-primary text-white py-2 px-6 rounded-md transition-all transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Login
                </div>
              </div>

              {/* Additional Links */}
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
